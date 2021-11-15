import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class FavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  readonly postId: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
