import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateMealRecordDto } from './dto/create_meal_record.dto';
import { CreateExerciseRecordDto } from './dto/create_exercise_record.dto';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'express';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('meal')
  @UseGuards(AuthGuard('jwt'))
  async createMealRecord(
    @Body() createMealRecordDto: CreateMealRecordDto,
    @Req() request,
  ) {
    const userId = request.user.user_id;
    return this.recordService.createMealRecord(createMealRecordDto, userId);
  }

  @Post('exercise')
  @UseGuards(AuthGuard('jwt'))
  async createExerciseRecord(
    @Body() createExerciseRecordDto: CreateExerciseRecordDto,
    @Req() request,
  ) {
    const userId = request.user.user_id;
    return this.recordService.createExerciseRecord(
      createExerciseRecordDto,
      userId,
    );
  }
}
