import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { GetExercisesQueryDto } from './dto/get-exercises-query.dto';
import { ILike } from 'typeorm';

@Injectable()
export class ExercisesService {
    constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) { }

    create(dto: CreateExerciseDto) {
        const exercise = this.exerciseRepository.create(dto);
        return this.exerciseRepository.save(exercise);
    }

    async findAll( query: GetExercisesQueryDto) {


        const {
            search,
            muscleGroup,
            page = "1",
            limit = "10",

        } = query;

        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;

        const where: any = {};

        if(muscleGroup) {
            where.muscleGroup = muscleGroup;
        }

        if (search) {
            where.name = ILike(`%${search}%`);
        }

        const [data, total] = await this.exerciseRepository.findAndCount({
            where,
            order: { name: 'ASC' },
            take,
            skip
        });

        return {
            data,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / take),
        }
    }

    findOne(id: number) {
        return this.exerciseRepository.findOneBy({ id });
    }

    async update(id: number, dto: Partial<CreateExerciseDto>) {
        await this.exerciseRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.exerciseRepository.delete(id);
        return { deleted: result.affected === 1 };
    }
}
