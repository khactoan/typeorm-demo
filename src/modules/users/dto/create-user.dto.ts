import { IsEnum, IsOptional, IsString } from 'class-validator';
import { USER_ROLE } from '../consts/user';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  fullName: string;

  @IsEnum(USER_ROLE)
  role: USER_ROLE;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  favoriteTheme: string;
}
