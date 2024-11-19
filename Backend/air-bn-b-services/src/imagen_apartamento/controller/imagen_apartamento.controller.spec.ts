import { Test, TestingModule } from '@nestjs/testing';
import { ImagenApartamentoController } from './imagen_apartamento.controller';

describe('ImagenApartamentoController', () => {
  let controller: ImagenApartamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagenApartamentoController],
    }).compile();

    controller = module.get<ImagenApartamentoController>(ImagenApartamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
