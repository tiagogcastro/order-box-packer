import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { BoxesListResponseDto } from '@/modules/boxes/dtos/boxes-list.dto';
import { ListBoxesUseCase } from '@/modules/boxes/usecases/list-boxes.usecase';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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