import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: Partial<UserService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn().mockImplementation((email) => {
        if (email === 'valid@example.com') {
          return Promise.resolve({
            id: 1,
            email,
            password: bcrypt.hashSync('password', 10),
            role: 'user',
          });
        }
        return null;
      }),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mocked_token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Debe generar un token si las credenciales son correctas', async () => {
    const result = await authService.login({
      email: 'valid@example.com',
      password: 'password',
    });
    expect(result).toHaveProperty('access_token', 'mocked_token');
  });

  it('Debe arrojar un error si las credenciales son incorrectas', async () => {
    await expect(
      authService.validateUser('invalid@example.com', 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
  });
});
