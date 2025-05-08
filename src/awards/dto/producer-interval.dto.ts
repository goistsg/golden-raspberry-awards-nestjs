import { ApiProperty } from '@nestjs/swagger';

export class ProducerIntervalDto {
  @ApiProperty()
  producer: string;

  @ApiProperty()
  interval: number;

  @ApiProperty()
  previousWin: number;

  @ApiProperty()
  followingWin: number;
}

export class ProducerAwardsIntervalDto {
  @ApiProperty({ type: [ProducerIntervalDto] })
  min: ProducerIntervalDto[];

  @ApiProperty({ type: [ProducerIntervalDto] })
  max: ProducerIntervalDto[];
}