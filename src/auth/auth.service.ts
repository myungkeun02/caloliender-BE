import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from 'src/entities/provider.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithProvider(provider: string, req, res) {
    // test
    console.log(req.user);

    // 소셜로그인 확인
    if (!req.user) {
      return `No user from ${provider}`;
    }

    // req에서 유저정보를 받아옴(name, email, accessToken, refreshToken)
    const user = req.user;

    // jwt토큰 발급 및 쿠키에 토큰 담기
    const jwtToken = await this.jwtService.sign(user);
    console.log(jwtToken);
    res.cookie('token', jwtToken, {
      httpOnly: true,
      maxAge: 86400000,
    });

    // 사용자가 db에 존재하는지 확인
    let existingUser = await this.userRepository.findOne({
      where: { provider_id: user.snsId },
    });

    if (!existingUser) {
      // 사용자가 존재하지 않을 경우 사용자 정보 입력
      const newUser = new UserEntity();
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.provider = provider;
      newUser.provider_id = user.snsId;

      existingUser = await this.userRepository.save(newUser);

      const providerEntity = new ProviderEntity();
      providerEntity.user_id = existingUser.id;
      providerEntity.access_token = user.accessToken;
      providerEntity.refresh_token = user.refreshToken;
      await this.providerRepository.save(providerEntity);
    } else {
      // 사용자가 이미 존재할 경우 토큰 정보 업데이트(구상중)
      console.log('로그인정보가 있습니다');
    }

    return {
      message: `User information from ${provider}`,
      user: req.user,
    };
  }
}
