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

  async seedBoxes() {
    const existingBoxes = await this.boxRepository.count();

    if (existingBoxes === 0) {
      const boxes = [
        new Box({ name: 'Caixa 1', height: 30, width: 40, length: 80 }),
        new Box({ name: 'Caixa 2', height: 50, width: 50, length: 40 }),
        new Box({ name: 'Caixa 3', height: 50, width: 80, length: 60 })
      ];

      await this.boxRepository.save(boxes);

      console.log(`Seeded ${boxes.length} boxes`);
    }
  }
}