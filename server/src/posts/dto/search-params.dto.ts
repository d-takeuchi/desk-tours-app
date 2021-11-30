import {
    IsString,
    MinLength,
    MaxLength,
  } from 'class-validator';
  
  export class SearchParamsDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    readonly title: string;
  }
  