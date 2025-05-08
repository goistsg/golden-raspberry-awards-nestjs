import { ApiProperty } from '@nestjs/swagger';

export class MoviesDto {
  @ApiProperty()
  producers: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  studios: string;

  @ApiProperty()
  winner: boolean;
}