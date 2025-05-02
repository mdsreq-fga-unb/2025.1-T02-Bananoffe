import { Test, TestingModule } from '@nestjs/testing';
import { CardapioController } from './cardapio.controller';

describe('CardapioController', () => {
  let controller: CardapioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardapioController],
    }).compile();

    controller = module.get<CardapioController>(CardapioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
