import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
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
}


