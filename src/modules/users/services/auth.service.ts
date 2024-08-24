import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(createUser: CreateUserDto) {
    const { password } = createUser;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.usersRepository.save({
      ...createUser,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return 'Sign in successfully';
      } else {
        return 'Invalid user or password';
      }
    } else {
      return 'Invalid user or password';
    }
  }
}
