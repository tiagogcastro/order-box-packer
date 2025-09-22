import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';

class ProductInputDto {
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'PS5' })
  @IsString()
  name: string;

  @ApiProperty({ example: 15 })
  @IsInt()
  @Min(1)
  height: number;

  @ApiProperty({ example: 8 })
  @IsInt()
  @Min(1)
  width: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(1)
  length: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [ProductInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductInputDto)
  products: ProductInputDto[];
}
