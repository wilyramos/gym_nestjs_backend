import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Membership } from 'src/memberships/entities/membership.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Membership])], // Import the User and Membership entities for TypeORM
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
