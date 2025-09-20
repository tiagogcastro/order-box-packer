import { Box } from '@/modules/boxes/entities/box.entity';
import { Product } from '@/modules/products/entities/products.entity';

describe('Box Entity', () => {
  it('should create a Box instance', () => {
    const box = new Box({
      name: 'Box A',
      height: 10,
      width: 10,
      length: 10,
    });

    expect(box).toBeInstanceOf(Box);
    expect(box.name).toBe('Box A');
  });

  it('should calculate volume correctly', () => {
    const box = new Box({ height: 2, width: 3, length: 4 });

    expect(box.getVolume()).toBe(24);
  });

  describe('canFit method', () => {
    it('should return true if product fits in empty box', () => {
      const box = new Box({ height: 10, width: 10, length: 10 });
      const product = new Product({ height: 5, width: 5, length: 5, name: 'Prod 1' });

      expect(box.canFit(product)).toBe(true);
    });

    it('should return false if product exceeds box dimensions', () => {
      const box = new Box({ height: 10, width: 10, length: 10 });
      const product = new Product({ height: 15, width: 5, length: 5, name: 'Prod 2' });

      expect(box.canFit(product)).toBe(false);
    });

    it('should return false if product exceeds box volume with existing products', () => {
      const box = new Box({ height: 10, width: 10, length: 10 });
      const existing = [new Product({ height: 5, width: 5, length: 5, name: 'Existing 1' })];
      const newProduct = new Product({ height: 10, width: 10, length: 10, name: 'New Prod' });

      expect(box.canFit(newProduct, existing)).toBe(false);
    });
  });
});
