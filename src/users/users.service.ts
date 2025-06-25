import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {

        // hash password before saving

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        })

        // Check if the user already exists by email
        const existingUser = await this.usersRepository.findOneBy({ email: createUserDto.email });
        if (existingUser) {
            throw new ConflictException(`User with email ${createUserDto.email} already exists`);
        }

        return this.usersRepository.save(user);
    }

    async findAll( page = 1, limit = 10) {

       const [users, total] = await this.usersRepository.findAndCount({
           skip: (page - 1) * limit,
           take: limit,
       });

       return {
           data: users,
           total,
           page,
           last_page: Math.ceil(total / limit),
       };
    }

    async findOne(id: number) {

        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);

        if( updateUserDto.email && updateUserDto.email !== user.email) {
            // Check if the new email already exists
            const existingUser = await this.usersRepository.findOneBy({ email: updateUserDto.email });
            if (existingUser) {
                throw new ConflictException(`User with email ${updateUserDto.email} already exists`);
            }
        }

        user.name = updateUserDto.name || user.name;
        user.email = updateUserDto.email || user.email;
        user.password = updateUserDto.password ? await bcrypt.hash(updateUserDto.password, 10) : user.password;
        user.dni = updateUserDto.dni || user.dni;
        user.role = updateUserDto.role || user.role;
        user.phone = updateUserDto.phone || user.phone;

        await this.usersRepository.save(user);

        return { message: `User with id ${id} has been updated` };
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
        return { message: `User with id ${id} has been removed` };
    }

    async findByEmail(email: string) {
        
        // get user by email and include password
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role', 'name', 'dni', 'phone'], // Include password for validation
        });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
}