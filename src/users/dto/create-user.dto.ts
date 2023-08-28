import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  username: string;
  password: string;
}
