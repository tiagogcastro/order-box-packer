import { ApiProperty } from '@nestjs/swagger';

class ProductResponseDto {
  @ApiProperty({ example: 'produto_1' })
  productId: string;

  @ApiProperty({ example: 'Smartphone Samsung' })
  name: string;

  @ApiProperty({ example: 15 })
  height: number;

  @ApiProperty({ example: 8 })
  width: number;

  @ApiProperty({ example: 20 })
  length: number;
}

export class PackResponseDto {
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  id: string;

  @ApiProperty({ example: 'pedido_001' })
  orderId: string;

  @ApiProperty({ example: 'Caixa 1' })
  boxType: string;

  @ApiProperty({ type: [ProductResponseDto] })
  products: ProductResponseDto[];

  @ApiProperty({ example: '2024-09-20T12:00:00Z' })
  created_at: Date;
}
