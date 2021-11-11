import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly comment: string;

  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
