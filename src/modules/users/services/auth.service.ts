import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
      select: ['password'],
    });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    } else {
      const hashedPassword = user.password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (isMatch) {
        return 'Login successfully!';
      } else {
        throw new BadRequestException('Invalid email or password');
      }
    }
  }
}
