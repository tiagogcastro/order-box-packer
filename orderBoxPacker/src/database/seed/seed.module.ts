import { SeedService } from '@/database/seed/seed.service';
import { BoxesSeed } from '@/database/seed/seeds/boxes.seed';
import { ProductsSeed } from '@/database/seed/seeds/products.seed';
import { UsersSeed } from '@/database/seed/seeds/users.seed';
import { BoxesModule } from '@/modules/boxes/boxes.module';
import { ProductsModule } from '@/modules/products/products.module';
import { UsersModule } from '@/modules/users/users.module';
import { BcryptService } from '@/shared/services/bcrypt/bcrypt.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BoxesModule,
    UsersModule,
    ProductsModule,
  ],
  providers: [
    SeedService,
    BcryptService,

    BoxesSeed,
    UsersSeed,
    ProductsSeed,
  ],
  exports: [],
})
export class SeedModule { }
