import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MembershipsModule } from './memberships/memberships.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
 

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }), // Global configuration module
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService]
    }),
    UsersModule, MembershipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
