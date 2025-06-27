import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MembershipsModule } from './memberships/memberships.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { ExercisesModule } from './exercises/exercises.module';
import { RoutinesModule } from './routines/routines.module';
 

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }), // Global configuration modulep
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService]
    }),
    UsersModule, MembershipsModule, AuthModule, PaymentsModule, ExercisesModule, RoutinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
