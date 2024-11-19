import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUbicacionDTO } from '../DTO/create-ubicacion-dto';
import { ResponseUbicacion } from '../DTO/response-ubicacion-dto';

@Injectable()
export class UbicacionService {
    constructor(private prisma:PrismaService){}

    async AllUbicaciones():Promise<ResponseUbicacion[]>{
        return await this.prisma.ubicaciones.findMany()
    }

    async GetUbicacionesByIndex(id:number):Promise<ResponseUbicacion>{
        return await this.prisma.ubicaciones.findUnique({
            where : {
                id : id
            }
        });
    }

    async PostUbicacion(apartamento:CreateUbicacionDTO):Promise<ResponseUbicacion>{
        return await this.prisma.ubicaciones.create({
            data : {
                nombre : apartamento.nombre,
                descripcion : apartamento.descripcion
            }
        });
    }

    async DeleteUbicacion(id: number): Promise<ResponseUbicacion> {
        const ubicacion = await this.prisma.ubicaciones.findFirst({
            where: { id: id },
        });
        if (!ubicacion) {
            throw new Error('Ubicacion no encontrada');
        }
        await this.prisma.ubicaciones.delete({
            where: { id: id },
        });
        return ubicacion;
    }
}
