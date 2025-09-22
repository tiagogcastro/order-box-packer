import { Order } from '@/modules/orders/entities/orders.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) { }

  async create(orderData: Partial<Order>) {
    const order = this.orderRepository.create(orderData);

    return this.orderRepository.save(order);
  }

  async findById(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['packs', 'packs.box']
    });
  }

  async findByOrderId(orderId: string) {
    return this.orderRepository.findOne({
      where: {
        id: orderId
      },
      relations: ['packs', 'packs.box']
    });
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['packs', 'packs.box']
    })

    return orders;
  }

  async update(id: string, updateData: Partial<Order>) {
    await this.orderRepository.update(id, updateData);

    return this.findById(id);
  }

  async updateStatus(orderId: string, status: string) {
    await this.orderRepository.update(
      {
        id: orderId
      },
      {
        status
      }
    );

    return this.findByOrderId(orderId);
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
