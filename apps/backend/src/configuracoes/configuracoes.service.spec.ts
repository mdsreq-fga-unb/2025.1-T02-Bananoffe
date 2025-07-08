import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracoesService } from './configuracoes.service';

describe('ConfiguracoesService', () => {
  let service: ConfiguracoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfiguracoesService],
    }).compile();

    service = module.get<ConfiguracoesService>(ConfiguracoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
