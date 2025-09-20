import { ProductResponseDto } from '@/modules/products/dtos/product-response.dto';
import { ApiProperty } from '@nestjs/swagger';

class ProductsDataDto {
  @ApiProperty({
    description: 'Array de produtos',
    type: [ProductResponseDto]
  })
  products: ProductResponseDto[];
}

export class ProductsListResponseDto {
  @ApiProperty({
    description: 'Dados dos produtos',
    type: ProductsDataDto
  })
  data: ProductsDataDto;
}
