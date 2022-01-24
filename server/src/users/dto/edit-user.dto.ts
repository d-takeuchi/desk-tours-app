import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator'

export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly icon: string
}
