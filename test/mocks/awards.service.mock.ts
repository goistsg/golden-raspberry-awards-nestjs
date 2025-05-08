import { movieMock } from "./movie.mock";
import { producersIntervalMock } from "./producers.interval.mock";
import { winnersMock } from "./winners.mock";

export const AwardsServiceMock = {
  onModuleInit: jest.fn().mockImplementation(),
  getProducerAwardsInterval: jest.fn().mockResolvedValue(producersIntervalMock),
  getAllAwards: jest.fn().mockResolvedValue([movieMock]),
  getWinners: jest.fn().mockResolvedValue(winnersMock),
  createAward: jest.fn().mockResolvedValue([movieMock]),
  updateAward: jest.fn().mockResolvedValue([movieMock]),
  deleteAward: jest.fn().mockImplementation()
};
