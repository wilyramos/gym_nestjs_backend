import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { UsersModule } from './users/users.module';
import { MembershipsModule } from './memberships/memberships.module';

@Module({
  imports: [UsersModule, MembershipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
