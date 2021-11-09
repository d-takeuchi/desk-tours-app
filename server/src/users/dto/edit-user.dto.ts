import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly icon: string;
}
