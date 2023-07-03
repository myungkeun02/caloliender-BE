import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('weight_log')
export class WeightLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.weightLogs)
  user: UserEntity;
}
