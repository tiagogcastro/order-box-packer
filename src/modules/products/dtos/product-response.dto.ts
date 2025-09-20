import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Identificador único do produto',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Smartphone Samsung Galaxy'
  })
  name: string;

  @ApiProperty({
    description: 'Altura do produto em centímetros',
    example: 15
  })
  height: number;

  @ApiProperty({
    description: 'Largura do produto em centímetros',
    example: 8
  })
  width: number;

  @ApiProperty({
    description: 'Comprimento do produto em centímetros',
    example: 20
  })
  length: number;
}
