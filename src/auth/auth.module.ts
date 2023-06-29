import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { NaverStrategy } from './naver.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'entitys/user.entity';
import { ProviderEntity } from 'entitys/provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProviderEntity]), // 엔티티 클래스 전달
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService, GoogleStrategy, KakaoStrategy, NaverStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
