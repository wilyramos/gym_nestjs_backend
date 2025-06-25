import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Repository } from 'typeorm';


@Injectable()
export class MembershipsService {

  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
  ) { }

  async create(createMembershipDto: CreateMembershipDto) {

    // Check if the membership already exists by name
    const existingMembership = await this.membershipRepository.findOneBy({ name: createMembershipDto.name });
    if (existingMembership) {
      throw new ConflictException(`Membership with name ${createMembershipDto.name} already exists`);
    }

    const membership = this.membershipRepository.create(createMembershipDto);
    return this.membershipRepository.save(membership);

  }

  findAll() {
    return this.membershipRepository.find();
  }

  findOne(id: number) {
    return this.membershipRepository.findOneBy({ id });
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto) {
    await this.membershipRepository.update(id, updateMembershipDto);
    const updatedMembership = await this.membershipRepository.findOneBy({ id });
    return {message : `Membership with id ${id} has been updated`};
  }

  async remove(id: number) {
    const membership = await this.membershipRepository.findOneBy({ id });
    if (!membership) {
      throw new NotFoundException(`Membership with id ${id} not found`);
    }
    await this.membershipRepository.delete(id);
    return { message: `Membership with id ${id} has been deleted` };
  }
}
