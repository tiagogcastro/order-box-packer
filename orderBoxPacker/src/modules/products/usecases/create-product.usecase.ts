import { CreateProductDto } from '@/modules/products/dtos/create-product.dto';
import { ProductRepository } from '@/modules/products/repositories/products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async execute(data: CreateProductDto) {
    const product = await this.productRepo.create(data);

    return product;
  }
}
