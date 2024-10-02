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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOkResponse({
    type: UserDto,
    isArray: true,
    description: 'Return a list of users',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    type: UserDto,
    description: 'Return user by ID',
  })
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

  /**
   * Create an user
   */
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInDto) {
    return await this.authService.signIn(body.email, body.password);
  }

  @Post('sign-out')
  signOut(@Session() session: Record<string, any>) {
    delete session.userId;
    return 'Sign out successfully!';
  }

  @Post('forgot-password')
  async forgotPassword() {
    return 'return password via email';
  }
}
