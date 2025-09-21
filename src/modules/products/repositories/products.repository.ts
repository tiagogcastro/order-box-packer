import { CreateProductDto } from '@/modules/products/dtos/create-product.dto';
import { Product } from '@/modules/products/entities/products.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);

    return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findById(id: string) {
    return this.productRepository.findOne({
      where: {
        id
      }
    });
  }

  async count() {
    return this.productRepository.count();
  }
}
