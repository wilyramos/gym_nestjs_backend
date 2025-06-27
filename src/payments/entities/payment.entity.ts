import { Membership } from "src/memberships/entities/membership.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    method: 'EFECTIVO' | 'TARJETA' | 'YAPE' | 'TRANSFERENCIA';

    @Column({nullable: true})
    notes?: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.id, { eager: false })
    user: User;

    @ManyToOne(() => Membership, membership => membership.id, { eager: false })
    membership: Membership;

    
}
