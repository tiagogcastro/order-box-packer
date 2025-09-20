import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Smartphone Samsung Galaxy',
    minLength: 1,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Product height in centimeters',
    example: 15,
    minimum: 1,
    maximum: 500
  })
  @IsInt()
  @Min(1)
  @Max(500)
  height: number;

  @ApiProperty({
    description: 'Product width in centimeters',
    example: 8,
    minimum: 1,
    maximum: 500
  })
  @IsInt()
  @Min(1)
  @Max(500)
  width: number;

  @ApiProperty({
    description: 'Product length in centimeters',
    example: 20,
    minimum: 1,
    maximum: 500
  })
  @IsInt()
  @Min(1)
  @Max(500)
  length: number;
}
