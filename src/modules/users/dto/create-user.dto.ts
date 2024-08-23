export class CreateUserDto {
  email: string;
  role?: string;
  password: string;
  fullName?: string;
  favoriteTheme?: string;
}
