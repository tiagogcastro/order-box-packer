import { User } from '@/modules/users/entities/user.entity';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly usersRepository: UsersRepository) { }

  async onModuleInit() {
    await this.usersRepository.seedUsers();
  }
}
