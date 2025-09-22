import { Box } from '@/modules/boxes/entities/box.entity';
import { BoxRepository } from '@/modules/boxes/repositories/box.repository';
import { PackInputDto } from '@/modules/pack/dtos/pack-input.dto';
import { PackOutputDto } from '@/modules/pack/dtos/pack-output.dto';
import { Pack } from '@/modules/pack/entities/pack.entity';
import { PackRepository } from '@/modules/pack/repositories/pack.repository';
import { Product } from '@/modules/products/entities/products.entity';
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class ProcessPackingUseCase {
  constructor(
    private readonly packRepository: PackRepository,
    private readonly boxRepository: BoxRepository,
  ) { }

  async execute(orders: PackInputDto[]) {
    const results: PackOutputDto[] = [];

    for (const order of orders) {
      await this.packRepository.deleteByOrderId(order.order_id);

      const products = this.convertToProducts(order.products);

      const packs = await this.packProducts(order.order_id, products);

      for (const pack of packs) {
        await this.packRepository.create(pack);
      }

      results.push({
        order_id: order.order_id,
        boxes: packs.map((pack) => ({
          box: pack.boxType,
          products: pack.products.map((product) => product.name),
        })),
      });
    }

    return results;
  }

  private convertToProducts(products: PackInputDto['products']) {
    return products.map(
      (product) =>
        new Product({
          name: product.name,
          height: product.dimensions.height,
          width: product.dimensions.width,
          length: product.dimensions.length,
        }),
    );
  }

  private async packProducts(
    orderId: string,
    products: Product[],
  ): Promise<Pack[]> {
    const packs: Pack[] = [];
    const availableBoxes = await this.boxRepository.findAllActive();

    products.sort(
      (a, b) => b.width * b.height * b.length - a.width * a.height * a.length,
    );

    for (const product of products) {
      let placed = false;

      for (const pack of packs) {
        const box = pack.box;
        const totalVolume = box.width * box.height * box.length;
        const usedVolume = pack.products.reduce(
          (sum, p) => sum + p.width * p.height * p.length,
          0,
        );
        const remainingVolume = totalVolume - usedVolume;
        const productVolume = product.width * product.height * product.length;

        const canFitDimensions =
          product.width <= box.width &&
          product.height <= box.height &&
          product.length <= box.length;

        if (canFitDimensions && productVolume <= remainingVolume) {
          pack.products.push(product);
          placed = true;
          break;
        }
      }

      if (!placed) {
        const chosenBox = this.selectBestBox(availableBoxes, product);

        if (chosenBox) {
          packs.push({
            id: crypto.randomUUID(),
            orderId,
            box: chosenBox,
            boxType: chosenBox.name,
            products: [product],
            created_at: new Date(),
          } as Pack);
          placed = true;
        } else {
          console.warn(
            `Produto ${product.name} não cabe em nenhuma caixa disponível.`,
          );
        }
      }
    }

    return packs;
  }

  private selectBestBox(boxes: Box[], product: Product): Box | null {
    const suitableBoxes = boxes.filter(
      (box) =>
        product.width <= box.width &&
        product.height <= box.height &&
        product.length <= box.length,
    );

    if (suitableBoxes.length === 0) return null;

    return suitableBoxes.reduce((smallest, current) =>
      current.getVolume() < smallest.getVolume() ? current : smallest,
    );
  }
}