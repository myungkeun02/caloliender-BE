import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_profile')
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  birth_date: Date;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true })
  start_weight: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @ManyToOne(() => UserEntity, (user) => user.userProfile)
  user: UserEntity;
}
