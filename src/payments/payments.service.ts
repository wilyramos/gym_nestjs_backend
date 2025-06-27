import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, type FindOptionsWhere } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Payment } from './entities/payment.entity';
import { MembershipsService } from 'src/memberships/memberships.service';
import type { getPaymentsQueryDto } from './dto/get-payments-query.dto';


@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private usersService: UsersService,
    private membershipsService: MembershipsService,
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const { userId, membershipId, amount, method, notes } = createPaymentDto;

    const [user, membership] = await Promise.all([
      this.usersService.findOne(userId),
      this.membershipsService.findOne(membershipId),
    ]);

    if (!user) throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    if (!membership) throw new NotFoundException(`Membresía con ID ${membershipId} no encontrada`);

    const now = new Date();
    const hasActiveMembership = user.membershipEndDate && user.membershipEndDate > now;

    const start = user.membershipEndDate && user.membershipEndDate > now
      ? new Date(user.membershipEndDate)
      : now;

    const newEnd = new Date(start);
    newEnd.setDate(newEnd.getDate() + membership.durationInDays);

    // Solo modificar startDate si no tiene una activa
    await this.usersService.update(user.id, {
      membershipId: membership.id,
      ...(hasActiveMembership ? {} : { membershipStartDate: now }),
      membershipEndDate: newEnd,
    });


    // Crear el pago
    const payment = this.paymentsRepository.create({
      amount,
      method,
      user,
      membership,
      notes,
    });

    await this.paymentsRepository.save(payment);

    return {
      message: `Pago de ${amount} realizado con éxito para el usuario ${user.name}. Fecha de inicio: ${start.toISOString()}, Fecha de finalización: ${newEnd.toISOString()}`,
    };
  }

  async findAll(query: getPaymentsQueryDto) {

    const { userId, method, startDate, endDate, page = 1, limit = 10 } = query;

    console.log('Query:', query);

    const where: FindOptionsWhere<Payment> = {};

    if (userId) {
      where.user = { id: Number(userId) };
    }

    if (method) {
      where.method = method;
    }

    if (startDate) {
      where.createdAt = Between(new Date(startDate), new Date(endDate || new Date()));
    }

    if (endDate) {
      where.createdAt = Between(new Date(startDate || new Date()), new Date(endDate));
    }

    const [data, total] = await this.paymentsRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'],
    });

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['user', 'membership'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  findByUserId(userId: number, page: number = 1, limit: number = 10) {
    return this.paymentsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['membership'],
    });
  }

  async findByUserIdPaginated(userId: number, page: number = 1, limit: number = 10) {

    const [data, total] = await this.paymentsRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['membership'],
    });
    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}