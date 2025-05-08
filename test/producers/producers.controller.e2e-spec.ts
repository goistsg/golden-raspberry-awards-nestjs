import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { AwardsService } from '../../src/awards/services/awards.service';
import { AwardsServiceMock } from '../mocks/awards.service.mock';
import { Movie } from '../../src/awards/entities/movie.entity';
import { movieRepositoryMock } from '../mocks/movie.repository.mock';

describe('ProducersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AwardsService)
      .useValue(AwardsServiceMock)
      .overrideProvider(getRepositoryToken(Movie))
      .useValue(movieRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  it('GET /awards/producers/interval - deve listar intervalos de prêmios', async () => {
    const response = await request(app.getHttpServer())
      .get('/awards/producers/interval')
      .expect(200);

    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');
  });

  afterAll(async () => {
    await app.close();
  });
});
