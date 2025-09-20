import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { CreateOrderDto } from '@/modules/orders/dtos/create-order.dto';
import { OrderResponseDto, OrdersListResponseDto } from '@/modules/orders/dtos/order-response.dto';
import { CreateOrderUseCase } from '@/modules/orders/usecases/create-order.usecase';
import { ListOrdersUseCase } from '@/modules/orders/usecases/list-orders.usecase';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Criar pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso',
    type: OrderResponseDto
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.createOrderUseCase.execute(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista de todos os pedidos realizados' })
  @ApiResponse({
    status: 201,
    description: 'Lista de pedidos realizados',
    type: OrdersListResponseDto
  })
  async findAll() {
    return await this.listOrdersUseCase.execute();
  }
}
