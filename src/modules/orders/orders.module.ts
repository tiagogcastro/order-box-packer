import { OrdersController } from '@/modules/orders/controllers/orders.controller';
import { Order } from '@/modules/orders/entities/orders.entity';
import { OrderRepository } from '@/modules/orders/repositories/orders.repository';
import { CreateOrderUseCase } from '@/modules/orders/usecases/create-order.usecase';
import { ListOrdersUseCase } from '@/modules/orders/usecases/list-orders.usecase';
import { PackModule } from '@/modules/pack/pack.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PackModule
  ],
  controllers: [
    OrdersController
  ],
  providers: [
    OrderRepository,
    CreateOrderUseCase,
    ListOrdersUseCase
  ],
  exports: [
    OrderRepository
  ]
})
export class OrdersModule { }
