import { ApiProperty } from '@nestjs/swagger';

export class WinnersDto {
  @ApiProperty()
  producers: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  studios: string;

}