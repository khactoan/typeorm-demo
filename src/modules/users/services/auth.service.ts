import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUser: CreateUserDto) {
    const isExist = await this.usersRepository.existsBy({
      email: createUser.email,
    });

    if (isExist) {
      throw new BadRequestException('User already exists');
    } else {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(createUser.password, salt);

      const newUser = await this.usersRepository.save({
        ...createUser,
        password,
      });

      return plainToInstance(User, newUser);
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'password', 'role'],
    });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
