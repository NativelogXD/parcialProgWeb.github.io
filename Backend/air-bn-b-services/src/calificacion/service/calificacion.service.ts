//calificacion.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCalificacionDto } from '../dto/create-calificacion.dto';
import { ResponseCalificacionDto } from '../dto/response-calificacion-dto';

@Injectable()
export class CalificacionService {
  constructor(private prisma:PrismaService){}


  async PostCalificacion(createCalificacion:CreateCalificacionDto):Promise<ResponseCalificacionDto>{
    const comentarioCreado = await this.prisma.calificaciones.create({
        data : {
            apartamento_id : createCalificacion.apartamento_id,
            usuario_id : createCalificacion.usuario_id,
            puntuacion : createCalificacion.puntuacion,
            comentario : createCalificacion.comentario
        }
    });
    return {
        usuario_id : comentarioCreado.usuario_id,
        puntuacion : comentarioCreado.puntuacion,
        comentario : comentarioCreado.comentario
    }
}
}
