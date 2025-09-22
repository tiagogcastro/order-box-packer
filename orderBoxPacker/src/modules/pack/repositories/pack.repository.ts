import { Pack } from '@/modules/pack/entities/pack.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PackRepository {
  constructor(
    @InjectRepository(Pack)
    private readonly packRepository: Repository<Pack>
  ) { }

  async create(data: Partial<Pack>) {
    const pack = this.packRepository.create(data);

    return await this.packRepository.save(pack);
  }

  async findByOrderId(orderId: string) {
    return await this.packRepository.find({
      where: {
        orderId
      },
      relations: {
        box: true,
      }
    });
  }

  async findAll() {
    return await this.packRepository.find({
      order: {
        created_at: 'DESC'
      },
      relations: {
        box: true,
      }
    });
  }

  async deleteByOrderId(orderId: string) {
    await this.packRepository.delete({
      orderId
    });
  }

  async findById(id: string) {
    return await this.packRepository.findOne({
      where: {
        id
      },
      relations: {
        box: true,
      }
    });
  }
}