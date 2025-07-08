import { Test, TestingModule } from '@nestjs/testing';
import { CardapioService } from './cardapio.service';

describe('CardapioService', () => {
  let service: CardapioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardapioService],
    }).compile();

    service = module.get<CardapioService>(CardapioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
