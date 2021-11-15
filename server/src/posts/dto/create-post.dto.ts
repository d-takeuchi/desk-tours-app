import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsNotEmpty,
  IsEmail,
  IsDataURI,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  readonly description: string;

  @IsNotEmpty()
  @IsDataURI()
  readonly imageFile: string;

  @IsNotEmpty()
  @IsArray()
  readonly tagIds: number[];

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
