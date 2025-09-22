import { BoxesController } from '@/modules/boxes/controllers/boxes.controller';
import { Box } from '@/modules/boxes/entities/box.entity';
import { BoxRepository } from '@/modules/boxes/repositories/box.repository';
import { ListBoxesUseCase } from '@/modules/boxes/usecases/list-boxes.usecase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Box
    ])
  ],
  controllers: [
    BoxesController
  ],
  providers: [
    BoxRepository,
    ListBoxesUseCase
  ],
  exports: [
    BoxRepository
  ]
})
export class BoxesModule { }