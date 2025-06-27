import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Payment } from './entities/payment.entity';
import { MembershipsService } from 'src/memberships/memberships.service';


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

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}