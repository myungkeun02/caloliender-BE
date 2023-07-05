import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from 'src/entities/user.entity';
import { UserProfileEntity } from 'src/entities/user_profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
