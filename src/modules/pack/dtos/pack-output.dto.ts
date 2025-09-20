import { ApiProperty } from '@nestjs/swagger';

class BoxOutputDto {
  @ApiProperty({ example: 'Caixa 1', description: 'Tipo da caixa utilizada' })
  box: string;

  @ApiProperty({
    example: ['produto_1', 'produto_2'],
    description: 'IDs dos produtos na caixa'
  })
  products: string[];
}

export class PackOutputDto {
  @ApiProperty({ example: 'pedido_001', description: 'ID do pedido processado' })
  order_id: string;

  @ApiProperty({
    type: [BoxOutputDto],
    description: 'Lista de caixas utilizadas'
  })
  boxes: BoxOutputDto[];
}