import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoritoDTO } from '../DTO/create-favorito-dto';
import { ResponseFavoritoDTO } from '../DTO/response-favorito-dto';

@Injectable()
export class FavoritoService {
    constructor(private prisma:PrismaService){}

    async AddFavotiro(dataFavorito : CreateFavoritoDTO): Promise<ResponseFavoritoDTO>{
        const fav = await this.prisma.favoritos.create({
            data : {
                usuario_id : dataFavorito.usuario_id,
                apartamento_id : dataFavorito.apartamento_id,
                fecha_agregado : dataFavorito.fecha_agregado ?? undefined
            }
        });
        return{
            ...fav
        }
    }
}
