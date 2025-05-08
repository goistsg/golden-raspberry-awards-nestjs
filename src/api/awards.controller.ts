import { Controller, Get, Query, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AwardsService } from '../awards/services/awards.service';
import { ProducerAwardsIntervalDto } from '../awards/dto/producer-interval.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WinnersDto } from '../awards/dto/winners.dto';
import { MoviesDto } from '../awards/dto/movies.dto';
import { CreateAwardDto } from '../awards/dto/create-award.dto';
import { UpdateAwardDto } from '../awards/dto/update-award.dto';
import { Movie } from '../awards/entities/movie.entity';

@ApiTags('awards')
@Controller('awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Get()
  @ApiOperation({ summary: 'Obter as informações principais do Golden Raspberry Awards' })
  @ApiResponse({ 
    status: 200, 
    description: 'Retorna a lista de todos os filmes', 
    type: Movie,
    isArray: true
  })
  async getAllAwards(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('year') year?: number,
    @Query('studio') studio?: string,
  ): Promise<Movie[]> {
    return this.awardsService.getAllAwards({ limit, page, year, studio });
  }

  @Get('winners')
  @ApiOperation({ summary: 'Obter a lista de vencedores do Golden Raspberry Awards' })
  @ApiResponse({ 
    status: 200, 
    description: 'Retorna a lista de vencedores do Golden Raspberry Awards', 
    type: WinnersDto,
    isArray: true
  })
  async getWinners(): Promise<WinnersDto[]> {
    return this.awardsService.getWinners();
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo prêmio' })
  @ApiResponse({ status: 201, description: 'Prêmio criado com sucesso', type: MoviesDto })
  async createAward(@Body() createAwardDto: CreateAwardDto): Promise<MoviesDto> {
    return this.awardsService.createAward(createAwardDto);
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar um prêmio existente' })
  @ApiResponse({ status: 200, description: 'Prêmio atualizado com sucesso', type: MoviesDto })
  async updateAward(
    @Body() updateAwardDto: UpdateAwardDto,
  ): Promise<MoviesDto> {
    return this.awardsService.updateAward(updateAwardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um prêmio' })
  @ApiResponse({ status: 204, description: 'Prêmio removido com sucesso' })
  async deleteAward(@Param('id') id: number): Promise<void> {
    return this.awardsService.deleteAward(id);
  }
}