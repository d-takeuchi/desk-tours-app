import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginDataDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
