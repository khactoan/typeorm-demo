import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  role?: string;

  @IsString()
  password: string;

  @IsOptional()
  fullName: string;

  favoriteTheme?: string;
}
