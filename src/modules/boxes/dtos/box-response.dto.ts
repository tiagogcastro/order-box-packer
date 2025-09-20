import { ApiProperty } from '@nestjs/swagger';

export class BoxResponseDto {
  @ApiProperty({
    description: 'Identificador único da caixa',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    description: 'Nome da caixa',
    example: 'Caixa 1'
  })
  name: string;

  @ApiProperty({
    description: 'Altura da caixa em centímetros',
    example: 15
  })
  height: number;

  @ApiProperty({
    description: 'Largura da caixa em centímetros',
    example: 8
  })
  width: number;

  @ApiProperty({
    description: 'Comprimento da caixa em centímetros',
    example: 20
  })
  length: number;

  @ApiProperty({
    description: 'Definição se a caixa está disponível',
    example: true
  })
  active: boolean;
}
