import { BoxRepository } from '@/modules/boxes/repositories/box.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoxesSeed {
  constructor(private readonly boxRepository: BoxRepository) { }

  async run() {
    try {
      const count = await this.boxRepository.count();

      if (count > 0) return;

      const boxes = await this.boxRepository.create([
        { name: 'Caixa 1', height: 30, width: 40, length: 80 },
        { name: 'Caixa 2', height: 50, width: 50, length: 40 },
        { name: 'Caixa 3', height: 50, width: 80, length: 60 },
      ]);

      console.log(`Seeded ${boxes.length} boxes`);
    } catch (error) {
      console.error('Erro no seed de boxes:', error);
    }
  }
}
