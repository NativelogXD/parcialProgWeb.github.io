import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComentarioDto } from '../DTO/create-comentario-dto';
import { ResponseComentarioDto } from '../DTO/response-comentario-dto';

@Injectable()
export class ComentarioService {
    constructor(private prisma:PrismaService){}

    async PostComentario(createComenatio:CreateComentarioDto):Promise<ResponseComentarioDto>{
        const comentarioCreado = await this.prisma.comentarios.create({
            data : {
                apartamento_id : createComenatio.apartamento_id,
                usuario_id : createComenatio.usuario_id,
                
                comentario : createComenatio.comentario,
                username : createComenatio.username
            }
        });
        return {
            usuario_id : comentarioCreado.usuario_id,
           
            comentario : comentarioCreado.comentario,
            username : comentarioCreado.username,
        }
    }
}
