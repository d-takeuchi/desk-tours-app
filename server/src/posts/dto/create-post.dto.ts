import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsNotEmpty,
} from 'class-validator'
import { Item } from 'src/items/items.entity'

export class CreatePostDto {
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

  @IsNotEmpty()
  readonly userId: number

  @IsArray()
  readonly items: Item[]
}
