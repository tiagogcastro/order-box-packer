import { AppDataSource } from '@/config/typeorm/data-source';
import { AuthModule } from '@/modules/auth/auth.module';
import { BoxesModule } from '@/modules/boxes/boxes.module';
import { OrdersModule } from '@/modules/orders/orders.module';
import { PackModule } from '@/modules/pack/pack.module';
import { ProductsModule } from '@/modules/products/products.module';
import { UsersModule } from '@/modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...AppDataSource.options as PostgresConnectionOptions
      }),
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    PackModule,
    BoxesModule,
    OrdersModule,
  ],
})
export class AppModule { }
