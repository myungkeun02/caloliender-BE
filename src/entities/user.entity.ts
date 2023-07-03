import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserProfileEntity } from './user_profile.entity';
import { WeightLogEntity } from './weight_log.entity';
import { ProviderEntity } from './provider.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column({ nullable: true })
  is_agreed: boolean;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  provider_id: string;

  @OneToMany(() => ProviderEntity, (provider) => provider.user)
  providers: ProviderEntity[];

  @OneToMany(() => UserProfileEntity, (userProfile) => userProfile.user)
  userProfile: UserProfileEntity[];

  @OneToMany(() => WeightLogEntity, (weightLog) => weightLog.user)
  weightLogs: WeightLogEntity[];
}
