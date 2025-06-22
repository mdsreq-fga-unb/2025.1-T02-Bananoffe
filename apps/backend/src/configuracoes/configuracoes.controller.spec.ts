import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracoesController } from './configuracoes.controller';

describe('ConfiguracoesController', () => {
  let controller: ConfiguracoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfiguracoesController],
    }).compile();

    controller = module.get<ConfiguracoesController>(ConfiguracoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
