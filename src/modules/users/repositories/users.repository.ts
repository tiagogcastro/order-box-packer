import { User } from '@/modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username }
    });
  }

  async create(username: string, password: string) {
    const user = this.userRepository.create({
      username,
      password,
    });

    return this.userRepository.save(user);
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id }
    });
  }

  async save(user: User) {
    return this.userRepository.save(user);
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async seedUsers() {
    try {
      const adminUsername = process.env.SEED_ADMIN_USERNAME as string;
      const adminPassword = process.env.SEED_ADMIN_PASSWORD as string;

      const existingAdmin = await this.findByUsername(adminUsername);

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await this.create(adminUsername, hashedPassword);

        console.log(`Usuário admin criado - username: ${adminUsername}, password: ${adminPassword}`);
      } else {
        console.log(`Usuário admin já existe: ${adminUsername}`);
      }

      console.log('Seed de usuários concluído');
    } catch (error) {
      console.error('Erro no seed de usuários:', error);
    }
  }
}
