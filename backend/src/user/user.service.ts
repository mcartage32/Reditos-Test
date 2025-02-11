import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(createUserDto: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
    });
  }

  async login(
    loginDto: User,
  ): Promise<{ success: boolean; user?: UserWithoutPassword }> {
    const user = await this.userRepository.findOneByUsername(loginDto.username);

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        user: userWithoutPassword,
      };
    }

    return { success: false };
  }
}
