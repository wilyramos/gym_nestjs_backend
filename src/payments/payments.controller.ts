import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { getPaymentsQueryDto } from './dto/get-payments-query.dto';
import type { AuthenticatedRequest } from 'src/types/user-request';


@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    console.log('Creating payment with data:', createPaymentDto);
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Get()
  findAll(@Query() query: getPaymentsQueryDto) {
    return this.paymentsService.findAll(query);
  }

  // get payments by userId
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.paymentsService.findByUserId(+userId);
  }

  // Get payments by user logged with pagination
  @UseGuards(JwtAuthGuard)
  @Get('my-payments')
  getMyPayments(@Req() req: AuthenticatedRequest,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.paymentsService.findByUserIdPaginated(req.user.id, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}