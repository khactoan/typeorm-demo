import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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
      return new BadRequestException('User already exists');
    } else {
      const salt = await bcrypt.genSalt();
      console.log('salt', salt);
      console.log('password', createUser.password);
      const password = await bcrypt.hash(createUser.password, salt);

      return await this.usersRepository.save({
        ...createUser,
        password,
      });
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['password'],
    });

    if (!user) {
      return new BadRequestException('Invalid email or password');
    } else {
      const hashedPassword = user.password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (isMatch) {
        return 'Login successfully!';
      } else {
        return new BadRequestException('Invalid email or password');
      }
    }
  }
}
