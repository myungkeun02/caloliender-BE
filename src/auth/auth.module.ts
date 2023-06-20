import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { NaverStrategy } from './naver.strategy';

@Module({
  providers: [AuthService, GoogleStrategy, KakaoStrategy, NaverStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
