import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { DiaryModule } from './diary/diary.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, UserModule, DiaryModule, TypeOrmModule.forRoot()],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
