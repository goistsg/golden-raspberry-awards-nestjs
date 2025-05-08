import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateAwardDto {
  @ApiProperty()
  @IsInt()
  year: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  studios: string;

  @ApiProperty()
  @IsString()
  producers: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  winner: boolean;
}