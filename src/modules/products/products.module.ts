import { ProductsController } from '@/modules/products/controllers/products.controller';
import { Product } from '@/modules/products/entities/products.entity';
import { ProductRepository } from '@/modules/products/repositories/products.repository';
import { CreateProductUseCase } from '@/modules/products/usecases/create-product.usecase';
import { ListProductsUseCase } from '@/modules/products/usecases/list-products.usecase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product
    ])
  ],
  controllers: [
    ProductsController
  ],
  providers: [
    ProductRepository,

    CreateProductUseCase,
    ListProductsUseCase
  ],
  exports: [
    ProductRepository
  ],
})
export class ProductsModule { }
