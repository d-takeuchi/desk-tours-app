import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsNotEmpty,
  IsDataURI,
} from 'class-validator'

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly title: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  readonly description: string

  @IsNotEmpty()
  readonly imageFile: string

  @IsNotEmpty()
  @IsArray()
  readonly tagIds: number[]
}
