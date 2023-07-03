import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { NaverStrategy } from './naver.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { ProviderEntity } from 'src/entities/provider.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProviderEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService, GoogleStrategy, NaverStrategy, KakaoStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
