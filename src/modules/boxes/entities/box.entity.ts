import { Product } from '@/modules/products/entities/products.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('boxes')
export class Box {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column('int')
  length: number;

  @Column({ default: true })
  active: boolean;

  constructor(data?: Partial<Box>) {
    Object.assign(this, data);
  }

  getVolume(): number {
    return this.height * this.width * this.length;
  }

  canFit(product: Product, existingProducts: Product[] = []) {
    const fitsDimensions =
      (product.height <= this.height) &&
      (product.width <= this.width) &&
      (product.length <= this.length);

    if (!fitsDimensions) {
      return false;
    }

    const usedVolume = existingProducts.reduce(
      (acc, product) => acc + product.getVolume(),
      0
    );

    const newVolume = usedVolume + product.getVolume();

    return newVolume <= this.getVolume();
  }
}