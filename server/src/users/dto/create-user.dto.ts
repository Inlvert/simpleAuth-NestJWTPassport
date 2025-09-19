import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsEmail()
  readonly email: string;
  @MinLength(8, { message: 'Password must be more then 8 symbols' })
  readonly password: string;
}
