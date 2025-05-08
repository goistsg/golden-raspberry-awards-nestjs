import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';
import { Movie } from '../../awards/entities/movie.entity';
import * as path from 'path';

@Injectable()
export class MovielistLoaderService {
  async loadMoviesFromCsv(): Promise<Movie[]> {
    try {
      console.debug('Iniciando processo de carregamento de lista');
      const csvFilePath = path.resolve(process.cwd(), 'data', 'movielist.csv');
      const fileContent = await readFile(csvFilePath, 'utf-8');
      
      const records = parse(fileContent, {
        delimiter: ';',
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });
      
      console.debug(`Processo finalizado com ${records.length} registros carregados na base de dados`);
      return records.map(record => ({
        year: parseInt(record.year, 10),
        title: record.title,
        studios: record.studios,
        producers: record.producers,
        winner: record.winner?.toLowerCase() === 'yes',
      }));
    } catch (error) {
      console.error('Erro ao carregar arquivo CSV:', error);
      throw error;
    }
  }
}