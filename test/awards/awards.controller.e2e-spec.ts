import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { AwardsService } from '../../src/awards/services/awards.service';
import { AwardsServiceMock } from '../mocks/awards.service.mock';
import { movieRepositoryMock } from '../mocks/movie.repository.mock';
import { Movie } from '../../src/awards/entities/movie.entity';
import { movieMock } from '../mocks/movie.mock';
import { createMovieDtoMock } from '../mocks/create.movie.dto..mock';

describe('AwardsController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;

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

  it('POST /awards - deve criar um novo prêmio', async () => {
    const response = await request(app.getHttpServer())
      .post('/awards')
      .send(createMovieDtoMock)
      .expect(201);
    
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Filme Mockado' })
      ])
    );
  });

  it('GET /awards - deve listar prêmios', async () => {
    const response = await request(app.getHttpServer())
      .get('/awards')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 1,
        year: 2022,
        title: 'Filme Mockado',
        studios: 'Estúdio Mock',
        producers: 'Produtor Mock',
        winner: false,
      },
    ]);
  });

  it('PUT /awards - deve atualizar um prêmio', async () => {
    await request(app.getHttpServer())
      .put('/awards')
      .send(movieMock)
      .expect(200);
  });

  it('DELETE /awards/:id - deve remover um prêmio', async () => {
    const id = 1
    await request(app.getHttpServer())
      .delete(`/awards/${id}`)
      .expect(200)
      .expect({});
  });

  afterAll(async () => {
    await app.close();
  });
});