import { Test, TestingModule } from '@nestjs/testing';
import { SacolaController } from './sacola.controller';

describe('SacolaController', () => {
  let controller: SacolaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SacolaController],
    }).compile();

    controller = module.get<SacolaController>(SacolaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
