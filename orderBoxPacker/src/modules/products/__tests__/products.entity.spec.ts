import { Product } from '@/modules/products/entities/products.entity';

describe('Products Entity', () => {
  it('should create a Product instance', () => {
    const product = new Product();

    expect(product).toBeInstanceOf(Product);
  });
});
