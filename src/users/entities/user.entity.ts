import { Membership } from '../../memberships/entities/membership.entity';
import { Routine } from '../../routines/entities/routine.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar', length: 8, nullable: true, unique: true })
  dni?: string;

  @Column({ type: 'enum', enum: ['CLIENT', 'TRAINER', 'ADMIN'], default: 'CLIENT' })
  role: 'CLIENT' | 'TRAINER' | 'ADMIN';

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  // Relation to Membership

  @ManyToOne(() => Membership, { eager: false, nullable: true })
  membership?: Membership;

  @Column({ type: 'timestamp', nullable: true })
  membershipStartDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  membershipEndDate?: Date;

  // Relation to Routines
  @OneToMany(() => Routine, (routine) => routine.user)
  routines: Routine[];
}
