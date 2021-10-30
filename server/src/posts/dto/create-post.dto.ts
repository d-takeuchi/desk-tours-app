import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly imageFile: string;

  @IsArray()
  @IsNotEmpty()
  readonly tagIds: number[];

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
