import { OrderRepository } from '@/modules/orders/repositories/orders.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListOrdersUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) { }

  async execute() {
    const orders = await this.orderRepository.findAll();

    return {
      data: {
        orders
      }
    }
  }
}