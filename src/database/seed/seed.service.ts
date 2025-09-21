import { BoxesSeed } from '@/database/seed/seeds/boxes.seed';
import { ProductsSeed } from '@/database/seed/seeds/products.seed';
import { UsersSeed } from '@/database/seed/seeds/users.seed';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly boxesSeed: BoxesSeed,
    private readonly productsSeed: ProductsSeed,
    private readonly usersSeed: UsersSeed,
  ) { }

  async onApplicationBootstrap() {
    console.log('Running seeds');

    await this.boxesSeed.run();
    await this.productsSeed.run();
    await this.usersSeed.run();

    console.log('Seeds completed');
  }
}
