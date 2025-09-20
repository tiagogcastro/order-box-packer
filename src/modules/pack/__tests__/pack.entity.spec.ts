import { Pack } from '@/modules/pack/entities/pack.entity';

describe('Pack Entity', () => {
  it('should create Pack instance', () => {
    const order = new Pack();

    expect(order).toBeInstanceOf(Pack);
  });
});
