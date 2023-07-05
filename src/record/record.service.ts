import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseRecordEntity } from 'src/entities/exercise_record.entity';
import { MealRecordEntity } from 'src/entities/meal_record.entity';
import { Repository } from 'typeorm';
import { CreateMealRecordDto } from './dto/create_meal_record.dto';
import { CreateExerciseRecordDto } from './dto/create_exercise_record.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(MealRecordEntity)
    private readonly mealRecordRepository: Repository<MealRecordEntity>,
    @InjectRepository(ExerciseRecordEntity)
    private readonly exerciseRecordRepository: Repository<ExerciseRecordEntity>,
  ) {}

  async createMealRecord(
    createMealRecordDto: CreateMealRecordDto,
    userId: number,
  ) {
    const mealRecord = new MealRecordEntity();
    mealRecord.meal_type = createMealRecordDto.meal_type;
    mealRecord.meal_name = createMealRecordDto.meal_name;
    mealRecord.calorie = createMealRecordDto.calorie;
    // mealRecord.user_id = userId;

    return this.mealRecordRepository.save(mealRecord);
  }

  async createExerciseRecord(
    createExerciseRecordDto: CreateExerciseRecordDto,
    userId: number,
  ) {
    const exerciseRecord = new ExerciseRecordEntity();
    exerciseRecord.exercise_name = createExerciseRecordDto.exercise_name;
    exerciseRecord.duration_minutes = createExerciseRecordDto.duration_minutes;
    exerciseRecord.burned_calories = createExerciseRecordDto.burned_calories;
    // exerciseRecord.user_id = userId;

    return this.exerciseRecordRepository.save(exerciseRecord);
  }
}
