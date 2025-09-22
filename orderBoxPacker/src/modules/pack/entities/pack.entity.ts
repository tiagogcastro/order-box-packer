import { Box } from '@/modules/boxes/entities/box.entity';
import { Order } from '@/modules/orders/entities/orders.entity';
import { Product } from '@/modules/products/entities/products.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('packs')
export class Pack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  boxType: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('jsonb')
  products: Product[];

  @ManyToOne(() => Box, { eager: false })
  @JoinColumn({ name: 'boxType', referencedColumnName: 'name' })
  box: Box;

  @ManyToOne(() => Order, order => order.packs, { eager: false })
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order: Order;

  constructor(data?: Partial<Pack>) {
    Object.assign(this, data);
  }
}