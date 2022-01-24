import {  IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class FavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  readonly postId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
