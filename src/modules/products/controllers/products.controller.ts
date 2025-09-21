import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateProductDto } from '@/modules/products/dtos/create-product.dto';
import { ProductResponseDto } from '@/modules/products/dtos/product-response.dto';
import { ProductsListResponseDto } from '@/modules/products/dtos/products-list.dto';
import { CreateProductUseCase } from '@/modules/products/usecases/create-product.usecase';
import { ListProductsUseCase } from '@/modules/products/usecases/list-products.usecase';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly listProducts: ListProductsUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Criar produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso', type: ProductResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() product: CreateProductDto) {
    return this.createProduct.execute(product);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos', type: ProductsListResponseDto })
  async findAll() {
    return this.listProducts.execute();
  }
}
