import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column('int')
  length: number;

  constructor(data?: Partial<Product>) {
    Object.assign(this, data);
  }

  getVolume(): number {
    return this.height * this.width * this.length;
  }
}
