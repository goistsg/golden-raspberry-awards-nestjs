import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'h2',
  database: ':memory:',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
}));