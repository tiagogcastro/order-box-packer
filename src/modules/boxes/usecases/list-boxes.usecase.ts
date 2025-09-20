import { BoxRepository } from '@/modules/boxes/repositories/box.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListBoxesUseCase {
  constructor(private readonly boxRepository: BoxRepository) { }

  async execute() {
    const boxes = await this.boxRepository.findAllActive();

    return {
      data: {
        boxes
      }
    };
  }
}