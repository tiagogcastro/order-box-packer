import { PackResponseDto } from '@/modules/pack/dtos/pack-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderResponseDto {
  @ApiProperty({ example: '8b31c96d-3d99-45ee-977f-a22b0651a938' })
  id: string;

  @ApiProperty({ example: 'packed' })
  status: string;

  @ApiProperty({ example: '2024-09-20T12:00:00Z' })
  created_at: Date;

  @ApiProperty({ example: '2024-09-20T12:00:00Z' })
  updated_at: Date;

  @ApiProperty({ type: [PackResponseDto] })
  packs: PackResponseDto[];
}

export class OrdersResponseDto {
  @ApiProperty({ type: [OrderResponseDto] })
  orders: OrderResponseDto[];
}

export class OrdersListResponseDto {
  @ApiProperty({
    description: 'Dados dos pedidos',
    type: OrdersResponseDto
  })
  data: OrdersResponseDto;
}
