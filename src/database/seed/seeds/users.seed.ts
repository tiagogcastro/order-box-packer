import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { BcryptService } from '@/shared/services/bcrypt/bcrypt.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersSeed {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService,
  ) { }

  async run() {
    try {
      const adminUsername = process.env.SEED_ADMIN_USERNAME as string;
      const adminPassword = process.env.SEED_ADMIN_PASSWORD as string;

      const existingAdmin = await this.usersRepository.findByUsername(adminUsername);

      if (!existingAdmin) {
        const hashedPassword = await this.bcryptService.hash(adminPassword);

        await this.usersRepository.create(adminUsername, hashedPassword);

        console.log(`Usuário admin criado - username: ${adminUsername}, password: ${adminPassword}`);
      }
    } catch (error) {
      console.error('Erro no seed de usuários:', error);
    }
  }
}
