import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy, LocalStrategy } from './auth.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expirationTime = configService.get<string>('JWT_EXPIRATION_TIME');

        return {
          secret: secret,
          signOptions: {
            expiresIn: expirationTime,
          },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
