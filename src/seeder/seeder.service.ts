import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Exercise } from '../exercises/entities/exercise.entity';
import { exercisesSeed } from '../seeder/data/exercises';
import { usersSeed } from '../seeder/data/users';
import { Membership } from '../memberships/entities/membership.entity';
import { membershipsSeed } from './data/memberships';


@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Exercise)
        private exerciseRepository: Repository<Exercise>,
        @InjectRepository(Membership)
        private membershipRepository: Repository<Membership>,
        

        
        private dataSource: DataSource
    ) { }

    async onModuleInit() {
        console.log('🚀 Iniciando el Seeder...');
        const connection = this.dataSource;
        await connection.dropDatabase();
        await connection.synchronize();
        console.log('✅ Base de datos reiniciada.');
    }

    async seed() {
        console.log('🌱 Iniciando la siembra de datos...');

        // --- Usuarios ---
        const existingUsers = await this.userRepository.count();
        if (existingUsers === 0) {
            const users = await usersSeed();
            await this.userRepository.save(users);
            console.log(`✅ ${users.length} usuarios insertados`);
        } else {
            console.log('⚠️ Usuarios ya existen. Se omite la inserción.');
        }

        // --- Ejercicios ---
        const existingExercises = await this.exerciseRepository.count();
        if (existingExercises === 0) {
            await this.exerciseRepository.save(exercisesSeed);
            console.log(`✅ ${exercisesSeed.length} ejercicios insertados`);
        } else {
            console.log('⚠️ Ejercicios ya existen. Se omite la inserción.');
        }

        // --- Membresías ---
        const existingMemberships = await this.membershipRepository.count();
        if (existingMemberships === 0) {
            await this.membershipRepository.save(membershipsSeed);
            console.log(`✅ ${membershipsSeed.length} membresías insertadas`);
        } else {
            console.log('⚠️ Membresías ya existen. Se omite la inserción.');
        }

        console.log('✅ Siembra finalizada exitosamente.');
    }
}