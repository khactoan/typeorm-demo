import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }
}
