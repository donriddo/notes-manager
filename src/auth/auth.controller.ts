import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { LocalAuthGuard } from './auth.guard';
import { Request } from 'express';
import { Public } from 'src/app.constants';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() dto: SignUpDTO) {
    const existingUser = await this.usersService.getByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.authService.signUp(dto.email, dto.password);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Req() req: Request, @Body() _dto: SignInDTO) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  async me(@Req() req: Request) {
    return req.user;
  }
}
