import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Membership {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // Ej: "Mensual", "Anual", "Premium"

    @Column('decimal', { precision: 10, scale: 2 })
    price: number; // Ej: 100.00

    @Column()
    durationInDays: number; // Ej: 30, 90, 365

    @Column({ default: true })
    isActive: boolean; // Para activar/desactivar la membresía

    // Relation to User
    @OneToMany(() => User, user => user.membership)
    users: User[]; // Relación con los usuarios que tienen esta membresía
}
