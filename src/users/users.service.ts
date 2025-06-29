import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Membership } from 'src/memberships/entities/membership.entity';
import type { GetUsersQueryDto } from 'src/users/dto/get-users-query.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Membership) private membershipRepository: Repository<Membership>,
    ) { }

    async create(createUserDto: CreateUserDto) {

        // Check if the user already exists by email
        const existingUser = await this.usersRepository.findOneBy({ email: createUserDto.email });
        if (existingUser) {
            throw new ConflictException(`User with email ${createUserDto.email} already exists`);
        }

        // hash password before saving

        if (!createUserDto.password) {
            throw new BadRequestException(`Password is required`);
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        })

        // If a membershipId is provided, link the user to the membership
        if (createUserDto.membershipId) {
            const membership = await this.membershipRepository.findOneBy({ id: createUserDto.membershipId });
            if (!membership) {
                throw new NotFoundException(`Membership with id ${createUserDto.membershipId} not found`);
            }
            user.membership = membership; // Assuming User entity has a 'membership' relation
            user.membershipStartDate = createUserDto.membershipStartDate ?? new Date(); // Default to current date if not provided

            const endDate = new Date(user.membershipStartDate);
            endDate.setDate(endDate.getDate() + membership.durationInDays); // Assuming Membership entity has a 'durationInDays' field
            user.membershipEndDate = endDate; // Set the end date based on the membership duration
        }
        return this.usersRepository.save(user);
    }

    // Create user by Admin

    async createByAdmin(createUserDto: CreateUserDto) {
        console.log('Creating user by admin with data:', createUserDto);

        const { email, dni, membershipId, membershipStartDate } = createUserDto;

        if (!dni) {
            throw new BadRequestException(`El DNI es obligatorio y se usará como contraseña`);
        }

        // Buscar email y dni en paralelo
        const [existingUserByEmail, existingUserByDni] = await Promise.all([
            this.usersRepository.findOneBy({ email }),
            this.usersRepository.findOneBy({ dni }),
        ]);

        if (existingUserByEmail) {
            throw new ConflictException(`El usuario con el email ${email} ya existe`);
        }

        if (existingUserByDni) {
            throw new ConflictException(`El usuario con el DNI ${dni} ya existe`);
        }

        // Usar el DNI como contraseña predeterminada
        const hashedPassword = await bcrypt.hash(dni, 10);

        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        if (membershipId) {
            const membership = await this.membershipRepository.findOneBy({ id: membershipId });
            if (!membership) {
                throw new NotFoundException(`Membership con ID ${membershipId} no existe`);
            }

            user.membership = membership;
            user.membershipStartDate = membershipStartDate ?? new Date();

            const endDate = new Date(user.membershipStartDate);
            endDate.setDate(endDate.getDate() + membership.durationInDays);
            user.membershipEndDate = endDate;
        }

        return this.usersRepository.save(user);
    }


    async findAll(query: GetUsersQueryDto) {


        console.log('Query:', query.query);

        const qb = this.usersRepository.createQueryBuilder('user');

        // If a query is provided, filter users by name or email
        if (query.query) {
            qb.where(
                'user.name ILIKE :search OR user.email ILIKE :search OR user.dni ILIKE :search',
                { search: `%${query.query}%` },
            );
        }

        // If a role is provided, filter users by role
        if (query.role) {
            qb.andWhere('user.role = :role', { role: query.role });
        }


        // order by id in descending order
        qb.orderBy('user.id', 'DESC');

        // Pagination
        const page = query.page ? Number(query.page) : 1;
        const limit = query.limit ? Number(query.limit) : 10;
        qb.skip((page - 1) * limit).take(limit);

        const [users, total] = await qb.getManyAndCount();

        return {
            users,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number) {

        const user = await this.usersRepository.findOne({
            where: { id },
            // relations: ['membership'],
        });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);

        if (updateUserDto.email && updateUserDto.email !== user.email) {
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

        // Update membership
        if (updateUserDto.membershipId) {
            const membership = await this.membershipRepository.findOneBy({ id: updateUserDto.membershipId });
            if (!membership) {
                throw new NotFoundException(`Membership with id ${updateUserDto.membershipId} not found`);
            }
            user.membership = membership;

            if (updateUserDto.membershipStartDate) {
                user.membershipStartDate = updateUserDto.membershipStartDate;
            }

            if (updateUserDto.membershipEndDate) {
                user.membershipEndDate = updateUserDto.membershipEndDate;
            }
        }
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