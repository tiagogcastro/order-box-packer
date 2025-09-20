import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { ListBoxesUseCase } from '@/modules/boxes/usecases/list-boxes.usecase';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoxesListResponseDto } from '../dtos/boxes-list.dto';

@ApiTags('Caixas')
@Controller('boxes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BoxesController {
  constructor(private readonly listBoxesUseCase: ListBoxesUseCase) { }

  @Get()
  @ApiOperation({ summary: 'Listar caixas disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de caixas ativas',
    type: BoxesListResponseDto
  })
  async findAll() {
    return await this.listBoxesUseCase.execute();
  }
}