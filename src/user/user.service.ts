import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserProfileEntity } from 'src/entities/user_profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private userProfileRepository: Repository<UserProfileEntity>,
  ) {}

  async saveProfile(
    userId: number,
    profileData: any,
  ): Promise<UserProfileEntity> {
    const userProfile = await this.userProfileRepository.findOne({
      where: { user_id: userId },
    });
    if (userProfile) {
      userProfile.birth_date = profileData.birth_date;
      userProfile.sex = profileData.sex;
      userProfile.start_weight = profileData.start_weight;
      userProfile.weight = profileData.start_weight;
      userProfile.height = profileData.height;
      return await this.userProfileRepository.save(userProfile);
    } else {
      const newUserProfile = new UserProfileEntity();
      newUserProfile.user_id = userId;
      newUserProfile.birth_date = profileData.birth_date;
      newUserProfile.sex = profileData.sex;
      newUserProfile.start_weight = profileData.start_weight;
      newUserProfile.weight = profileData.weight;
      newUserProfile.height = profileData.height;
      return await this.userProfileRepository.save(newUserProfile);
    }
  }

  async calculateBMI(weight: number, height: number): Promise<number> {
    const heightInMeter = height / 100;
    return weight / (heightInMeter * heightInMeter);
  }

  async calculateBMR(
    sex: string,
    weight: number,
    height: number,
    age: number,
  ): Promise<number> {
    let bmr = 0;
    if (sex === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (sex === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return bmr;
  }
}
