import { Order } from '@/modules/orders/entities/orders.entity';

describe('Order Entity', () => {
  it('should create Order instance', () => {
    const order = new Order();

    expect(order).toBeInstanceOf(Order);
  });
});
