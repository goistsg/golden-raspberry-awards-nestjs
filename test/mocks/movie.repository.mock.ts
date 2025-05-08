import { movieMock } from "./movie.mock";

export const movieRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn().mockResolvedValue(movieMock),
  save: jest.fn().mockResolvedValue(movieMock),
  create: jest.fn().mockResolvedValue(movieMock),
  delete: jest.fn(),
};
