import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('meal_record')
export class MealRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meal_type: string;

  @Column()
  meal_name: string;

  @Column()
  calorie: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.mealRecords)
  user: UserEntity;
}
