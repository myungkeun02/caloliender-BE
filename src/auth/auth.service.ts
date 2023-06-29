import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm'; // InjectRepository 추가
import { Repository } from 'typeorm'; // Repository 추가
import { UserEntity } from 'entitys/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // UserRepository 주입
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req, res) {
    if (!req.user) {
      return 'No user from google';
    }
    const user = req.user;
    const accessToken = await this.jwtService.sign(user);
    res.cookie('token', accessToken, {
      httpOnly: true,
      maxAge: 86400000,
    });
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async kakaoLogin(req, res) {
    if (!req.user) {
      return 'No user from kakao';
    }
    const user = req.user;
    const accessToken = await this.jwtService.sign(user);
    res.cookie('token', accessToken, {
      httpOnly: true,
      maxAge: 86400000,
    });
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async naverLogin(req, res) {
    if (!req.user) {
      return 'No user from naver';
    }
    const user = req.user;
    const accessToken = await this.jwtService.sign(user);
    res.cookie('token', accessToken, {
      httpOnly: true,
      maxAge: 86400000,
    });
    return {
      message: 'User information from naver',
      user: req.user,
    };
  }
}
