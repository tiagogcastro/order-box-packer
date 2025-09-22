import { Box } from '@/modules/boxes/entities/box.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoxRepository {
  constructor(
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>
  ) { }

  async findAllActive() {
    return await this.boxRepository.find({
      where: {
        active: true
      }
    });
  }

  async findById(id: string) {
    return await this.boxRepository.findOne({
      where: {
        id
      }
    });
  }

  async create(boxData: Partial<Box>) {
    const box = this.boxRepository.create(boxData);

    return await this.boxRepository.save(box);
  }

  async count() {
    return this.boxRepository.count();
  }
}