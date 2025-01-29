import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { USER_TYPE } from '../enums/user-type.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(USER_TYPE)
  @IsNotEmpty()
  type: USER_TYPE;
}
