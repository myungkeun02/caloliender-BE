import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {}

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  kakaoAuthRedirect(@Req() req, @Res() res) {
    return this.authService.kakaoLogin(req, res);
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth(@Req() req) {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  naverAuthRedirect(@Req() req, @Res() res) {
    return this.authService.naverLogin(req, res);
  }
}

/*
1) 클라이언트에서 백엔드서버에 로그인 요청 (ex 로그인 버튼)
2) 백엔드 서버에서 clientID, clientSecret, scope, RedirectURL과 함께 Authorization Server에 로그인 요청 
3) authorization server에서 클라이언트에게 로그인 페이지 제공
4) 클라이언트가 authorization server에 id, password 인증
5) Authorization Server 는 제공된 Redirect URI로 클라이언트를 리디렉션시킨다. 이때, Redirect URI에 Authorization Code를 포함하여 사용자를 리디렉션 시킨다
   이때, Authorization Code란 Client가 Access Token을 획득하기 위해 사용하는 임시 코드이다. 이 코드는 수명이 매우 짧다. (일반적으로 1~10분)
6) Client는 Authorization Server에 Authorization Code를 전달하고, Access Token을 응답받는다.
   Client는 발급받은 Resource Owner의 Access Token을 저장하고, 이후 Resource Server에서 Resource Owner의 리소스에 접근하기 위해 Access Token을 사용한다.
7) 위 과정을 성공적으로 마치면 Client는 Resource Owner에게 로그인이 성공하였음을 알린다.
8) 이후 Resource Owner가 Resource Server의 리소스가 필요한 기능을 Client에 요청한다.
Client는 위 과정에서 발급받고 저장해둔 Resource Owner의 Access Token을 사용하여 제한된 리소스에 접근하고, Resource Owner에게 자사의 서비스를 제공한다.
   */
