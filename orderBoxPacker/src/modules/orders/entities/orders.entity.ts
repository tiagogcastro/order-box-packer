import { Pack } from '@/modules/pack/entities/pack.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Pack, pack => pack.order, { cascade: true })
  packs: Pack[];

  constructor(data?: Partial<Order>) {
    this.status = 'pending';
    Object.assign(this, data);
  }
}