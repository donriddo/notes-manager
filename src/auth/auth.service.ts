import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.usersService.create({ email, password });
    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return null;
    }

    const payload: JwtPayload = { email: user.email, sub: String(user._id) };

    return {
      token: this.jwtService.sign(payload),
      email: user.email,
      id: user._id,
    };
  }
}
