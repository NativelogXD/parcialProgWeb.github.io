import { Test, TestingModule } from '@nestjs/testing';
import { ImagenApartamentoService } from './imagen_apartamento.service';

describe('ImagenApartamentoService', () => {
  let service: ImagenApartamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagenApartamentoService],
    }).compile();

    service = module.get<ImagenApartamentoService>(ImagenApartamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
