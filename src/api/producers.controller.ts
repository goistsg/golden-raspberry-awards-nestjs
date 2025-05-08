import { Controller, Get } from '@nestjs/common';
import { AwardsService } from '../awards/services/awards.service';
import { ProducerAwardsIntervalDto } from '../awards/dto/producer-interval.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('awards')
@Controller('awards/producers')
export class ProducersController {
  constructor(private readonly awardsService: AwardsService) {}

  @Get('interval')
  @ApiOperation({ summary: 'Obter o intervalo de premiações dos produtores' })
  @ApiResponse({ 
    status: 200, 
    description: 'Retorna os produtores com maior e menor intervalo entre vitórias', 
    type: ProducerAwardsIntervalDto 
  })
  async getAwardsInterval(): Promise<ProducerAwardsIntervalDto> {
    return this.awardsService.getProducerAwardsInterval();
  }
}