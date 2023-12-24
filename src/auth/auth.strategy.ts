import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { Strategy as StrategyLocal } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtPayload, AuthUser } from './auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(StrategyLocal) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.signIn(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(StrategyJWT) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): AuthUser {
    return { id: payload.sub, email: payload.email };
  }
}
