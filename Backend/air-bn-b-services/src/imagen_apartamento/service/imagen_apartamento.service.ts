import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImagen_ApartamentoDTO } from '../DTO/create-imagen_apartamento-dto';
import { ResponseImagen_ApartamentoDTO } from '../DTO/response-imagen_apartamento-dto';

@Injectable()
export class ImagenApartamentoService {
    constructor(private prisma:PrismaService){}

    async PostApartamentoImagen(createImagen:CreateImagen_ApartamentoDTO):Promise<ResponseImagen_ApartamentoDTO>{
        return await this.prisma.imagenes_apartamento.create({
            data : {
                apartamento_id : createImagen.apartamento_id,
                url_imagen : createImagen.url_imagen
            }
        })
    }
}
