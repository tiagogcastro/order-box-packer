import { BoxesModule } from '@/modules/boxes/boxes.module';
import { Pack } from '@/modules/pack/entities/pack.entity';
import { PackRepository } from '@/modules/pack/repositories/pack.repository';
import { ProcessPackingUseCase } from '@/modules/pack/usecases/process-packing.usecase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pack
    ]),
    BoxesModule
  ],
  controllers: [],
  providers: [
    PackRepository,
    ProcessPackingUseCase,
  ],
  exports: [
    PackRepository,
    ProcessPackingUseCase
  ]
})
export class PackModule { }
