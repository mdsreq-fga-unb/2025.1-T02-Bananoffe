import { Test, TestingModule } from '@nestjs/testing';
import { SacolaService } from './sacola.service';

describe('SacolaService', () => {
  let service: SacolaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SacolaService],
    }).compile();

    service = module.get<SacolaService>(SacolaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
