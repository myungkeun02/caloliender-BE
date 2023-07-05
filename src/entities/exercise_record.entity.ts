import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('exercise_record')
export class ExerciseRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exercise_name: string;

  @Column()
  duration_minutes: number;

  @Column()
  burned_calories: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.exerciseRecords)
  user: UserEntity;
}
