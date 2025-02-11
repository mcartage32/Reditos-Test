import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: User) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: User) {
    return this.userService.login(loginDto);
  }
}
