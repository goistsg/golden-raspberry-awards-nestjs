import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { MovielistLoaderService } from '../../src/shared/services/movielist-loader.service';

describe('AwardsController check csv file (e2e)', () => {
  let app: INestApplication;
  let movielistLoaderService: MovielistLoaderService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    movielistLoaderService = moduleFixture.get(MovielistLoaderService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  })

  it('GET /awards - deve retornar exatamente os dados do arquivo CSV', async () => {
    const records = await movielistLoaderService.loadMoviesFromCsv();

    const response = await request(app.getHttpServer())
      .get('/awards?limit=1000')
      .expect(200);

    const responseWithoutId = response.body.map(({ id, ...rest }) => rest);

    const sortFn = (a, b) => a.title.localeCompare(b.title);
    expect(responseWithoutId.sort(sortFn)).toEqual(records.sort(sortFn));
  });

  afterAll(async () => {
    await app.close();
  });
});