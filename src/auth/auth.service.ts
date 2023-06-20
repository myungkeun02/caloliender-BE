import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  kakaoLogin(req) {
    if (!req.user) {
      return 'No user from kakao';
    }

    return {
      message: 'User information from kakao',
      user: req.user,
    };
  }

  naverLogin(req) {
    if (!req.user) {
      return 'No user from naver';
    }

    return {
      message: 'User information from naver',
      user: req.user,
    };
  }
}
