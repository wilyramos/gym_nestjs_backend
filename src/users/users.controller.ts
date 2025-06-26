import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import type { GetUsersQueryDto } from 'src/memberships/dto/get-product.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    console.log('Creating user with data:', createUserDto);

    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
  //   return this.usersService.findAll(Number(page), Number(limit));
  // }
  @Get()
  findAll(@Query() query: GetUsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    console.log('Updating user with ID:', id, 'and data:', updateUserDto);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: number) {
        console.log('Removing user with ID:', id);
        return this.usersService.remove(id);
    }
}
