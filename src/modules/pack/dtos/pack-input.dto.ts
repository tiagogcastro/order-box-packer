import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';

class DimensionsDto {
  @ApiProperty({ example: 15, description: 'Altura em centímetros' })
  @IsInt()
  @Min(1)
  height: number;

  @ApiProperty({ example: 8, description: 'Largura em centímetros' })
  @IsInt()
  @Min(1)
  width: number;

  @ApiProperty({ example: 20, description: 'Comprimento em centímetros' })
  @IsInt()
  @Min(1)
  length: number;
}

class ProductInputDto {
  @ApiProperty({ example: 'PS5', description: 'Nome do produto' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'produto_1', description: 'ID único do produto' })
  @IsString()
  product_id: string;

  @ApiProperty({ type: DimensionsDto, description: 'Dimensões do produto' })
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions: DimensionsDto;
}

export class PackInputDto {
  @ApiProperty({ example: 'pedido_001', description: 'ID único do pedido' })
  @IsString()
  order_id: string;

  @ApiProperty({
    type: [ProductInputDto],
    description: 'Lista de produtos do pedido'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductInputDto)
  products: ProductInputDto[];
}
