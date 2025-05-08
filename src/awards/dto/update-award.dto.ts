import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt } from 'class-validator';

export class UpdateAwardDto {
  @ApiProperty()
  @IsInt()
  id: number;
  
  @ApiProperty()
  @IsString()
  producers: string;

  @ApiProperty()
  @IsInt()
  year: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  studios: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  winner: boolean;
}