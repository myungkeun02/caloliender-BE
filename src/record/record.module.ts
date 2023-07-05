import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from './record.controller';
import { MealRecordEntity } from 'src/entities/meal_record.entity';
import { ExerciseRecordEntity } from 'src/entities/exercise_record.entity';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature([MealRecordEntity, ExerciseRecordEntity])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
