import { BoxResponseDto } from '@/modules/boxes/dtos/box-response.dto';
import { ApiProperty } from '@nestjs/swagger';

class BoxesDataDto {
  @ApiProperty({
    description: 'Array de caixas',
    type: [BoxResponseDto]
  })
  boxes: BoxResponseDto[];
}

export class BoxesListResponseDto {
  @ApiProperty({
    description: 'Dados das caixas',
    type: BoxesDataDto
  })
  data: BoxesDataDto;
}
