import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    description: 'Email of user',
  })
  email: string;

  @ApiProperty({ enum: ['ADMIN', 'BUYER'], default: 'BUYER' })
  role: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  favoriteTheme: string;

  @ApiProperty()
  greeting: string;
}
