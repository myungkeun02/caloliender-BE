import { Controller, UseGuards, Request, Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  async saveProfile(@Request() req, @Body() profileData: any) {
    const userId = req.user.id;
    const userProfile = await this.userService.saveProfile(userId, profileData);
    return userProfile;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('bmi-bmr')
  async calculateBMIAndBMR(@Request() req, @Body() body: any) {
    const { weight, height, age } = body;
    const userProfile = await this.userService.saveProfile(req.user.id, { weight, height });

    const bmi = await this.userService.calculateBMI(userProfile.weight, userProfile.height);
    const bmr = await this.userService.calculateBMR(userProfile.sex, userProfile.weight, userProfile.height, age);

    return { bmi, bmr };
  }
}
