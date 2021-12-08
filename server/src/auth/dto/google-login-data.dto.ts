import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class GoogleLoginDataDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly familyName: string;

  @IsNotEmpty()
  @IsString()
  readonly givenName: string;

  @IsNotEmpty()
  @IsString()
  readonly googleId: string;

  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
