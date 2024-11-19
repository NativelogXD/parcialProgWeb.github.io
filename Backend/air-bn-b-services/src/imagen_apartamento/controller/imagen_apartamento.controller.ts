import { Body, Controller, Post } from '@nestjs/common';
import { ImagenApartamentoService } from '../service/imagen_apartamento.service';
import { CreateImagen_ApartamentoDTO } from '../DTO/create-imagen_apartamento-dto';
import { ResponseImagen_ApartamentoDTO } from '../DTO/response-imagen_apartamento-dto';

@Controller('imagen-apartamento')
export class ImagenApartamentoController {
    constructor(private readonly imagenApartamentoService : ImagenApartamentoService){}

    @Post()
    async PostImagen(@Body() dataImagen:CreateImagen_ApartamentoDTO):Promise<ResponseImagen_ApartamentoDTO>{
        return this.imagenApartamentoService.PostApartamentoImagen(dataImagen);
    }
}
