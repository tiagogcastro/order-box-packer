import { ProductsListResponseDto } from '@/modules/products/dtos/products-list.dto';
import { ProductRepository } from '@/modules/products/repositories/products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async execute(): Promise<ProductsListResponseDto> {
    const products = await this.productRepo.findAll();

    return {
      data: {
        products
      }
    }
  }
}
