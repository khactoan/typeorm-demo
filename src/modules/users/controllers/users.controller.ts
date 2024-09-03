import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @Post('sign-up')
  async signUp(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signUp(body);
    session.userId = user.id;

    return user;
  }

  @Post('sign-in')
  async signIn(
    @Body() body: SignInDto,
    @Session() session: Record<string, any>,
  ) {
    console.log('Route handler executed');
    console.log('session', session);
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return 'Login successfully!';
  }

  @Post('sign-out')
  signOut(@Session() session: Record<string, any>) {
    delete session.userId;
    return 'Sign out successfully!';
  }
}
