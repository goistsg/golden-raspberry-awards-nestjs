import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { MovielistLoaderService } from '../../shared/services/movielist-loader.service';
import { ProducerAwardsIntervalDto, ProducerIntervalDto } from '../dto/producer-interval.dto';
import { WinnersDto } from '../dto/winners.dto';
import { MoviesDto } from '../dto/movies.dto';
import { CreateAwardDto } from '../dto/create-award.dto';
import { UpdateAwardDto } from '../dto/update-award.dto';

@Injectable()
export class AwardsService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly movielistLoaderService: MovielistLoaderService,
  ) {}

  async onModuleInit() {
    await this.loadMoviesFromCsv();
  }

  private async loadMoviesFromCsv() {
    const movies = await this.movielistLoaderService.loadMoviesFromCsv();
    await this.movieRepository.save(movies);
  }

  private findWinners(): Promise<Movie[]> {
    return this.movieRepository.find({ 
      where: { winner: true },
      order: { year: 'ASC' }
    });
  }

  async getProducerAwardsInterval(): Promise<ProducerAwardsIntervalDto> {
    const winners = await this.findWinners()

    const producerWins = new Map<string, number[]>();
    winners.forEach(movie => {
      // Tratar múltiplos produtores separados por vírgula ou 'and'
      const producers = movie.producers
        .split(/\s*(?:,.and|,|\ and)\s*/i)
        .map(producer => producer.trim())
        .filter(producer => producer);
        
      producers.forEach(producer => {
        const producersToWins: number[] = producerWins.get(producer) || [];
        producersToWins.push(movie.year)
        producerWins.set(producer, producersToWins);
      });
    });
    
    const intervals: ProducerIntervalDto[] = [];
    producerWins.forEach((years, producer) => {
      if (years.length >= 2) {
        for (let i = 1; i < years.length; i++) {
          intervals.push({
            producer,
            interval: years[i] - years[i-1],
            previousWin: years[i-1],
            followingWin: years[i]
          });
        }
      }
    });
    
    intervals.sort((a, b) => a.interval - b.interval);
    
    const minInterval = intervals.length > 0 ? intervals[0].interval : 0;
    const maxInterval = intervals.length > 0 ? intervals[intervals.length - 1].interval : 0;
    
    const result: ProducerAwardsIntervalDto = {
      min: intervals.filter(item => item.interval === minInterval),
      max: intervals.filter(item => item.interval === maxInterval)
    };
    return result;
  }

  async getAllAwards(options?: { limit?: number; page?: number; year?: number; studio?: string }): Promise<Movie[]> {
    const { limit = 10, page = 1, year, studio } = options || {};

    const where: any = {};
    if (year) where.year = year;
    if (studio) where.studios = ILike(`%${studio}%`);

    return this.movieRepository.find({
      where,
      order: { year: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getWinners(): Promise<WinnersDto[]>  {
    const winners = await this.findWinners()
    return winners.map(w => {
      return {
          producers: w.producers,
          year: w.year,
          title: w.title,
          studios: w.studios
        }
    });
  }

  async createAward(createAwardDto: CreateAwardDto): Promise<MoviesDto> {
    const movie = this.movieRepository.create(createAwardDto);
    try {
      const saved = await this.movieRepository.save(movie);
      return {
        producers: saved.producers,
        year: saved.year,
        title: saved.title,
        studios: saved.studios,
        winner: saved.winner,
      };
    } catch (error) {
      throw new Error(`Erro ao criar o prêmio: ${error.message}`);
    }
  }

  async updateAward(updateAwardDto: UpdateAwardDto): Promise<MoviesDto> {
    const { id } = updateAwardDto
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Prêmio não encontrado');
    }
    try {
      Object.assign(movie, updateAwardDto);
      const updated = await this.movieRepository.save(movie);
      return {
        producers: updated.producers,
        year: updated.year,
        title: updated.title,
        studios: updated.studios,
        winner: updated.winner,
      };
    } catch (error) {
      throw new Error(`Erro ao criar o prêmio: ${error.message}`);
    }
  }

  async deleteAward(id: number): Promise<void> {
    const result = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Prêmio não encontrado');
    }
  }
}