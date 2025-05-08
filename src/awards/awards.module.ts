import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { AwardsService } from './services/awards.service';
import { ProducersController } from '../api/producers.controller';
import { MovielistLoaderService } from '../shared/services/movielist-loader.service';
import { AwardsController } from '../api/awards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [AwardsController, ProducersController],
  providers: [AwardsService, MovielistLoaderService],
})
export class AwardsModule {}
