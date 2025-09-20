import { CreateOrderDto } from '@/modules/orders/dtos/create-order.dto';
import { Order } from '@/modules/orders/entities/orders.entity';
import { OrderRepository } from '@/modules/orders/repositories/orders.repository';
import { ProcessPackingUseCase } from '@/modules/pack/usecases/process-packing.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly processPackingUseCase: ProcessPackingUseCase
  ) { }

  async execute(createOrderDto: CreateOrderDto) {
    const order = new Order({
      status: 'processing'
    });

    const savedOrder = await this.orderRepository.create(order);

    await this.processPackingUseCase.execute([{
      order_id: savedOrder.id,
      products: createOrderDto.products.map((product) => ({
        product_id: product.id,
        name: product.name,
        dimensions: {
          height: product.height,
          width: product.width,
          length: product.length
        }
      }))
    }]);

    await this.orderRepository.updateStatus(savedOrder.id, 'packed');

    const orderUpdated = await this.orderRepository.findByOrderId(savedOrder.id);

    return {
      data: {
        order: orderUpdated
      }
    }
  }
}