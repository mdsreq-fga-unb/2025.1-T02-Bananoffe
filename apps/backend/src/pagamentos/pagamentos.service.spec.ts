import { Test, TestingModule } from '@nestjs/testing';
import { PagamentosService } from './pagamentos.service';

describe('PagamentosService', () => {
  let service: PagamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagamentosService],
    }).compile();

    service = module.get<PagamentosService>(PagamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
