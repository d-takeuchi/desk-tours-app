import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDataDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
