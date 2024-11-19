import { Test, TestingModule } from '@nestjs/testing';
import { ApartamentoController } from './apartamento.controller';

describe('ApartamentoController', () => {
  let controller: ApartamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartamentoController],
    }).compile();

    controller = module.get<ApartamentoController>(ApartamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
