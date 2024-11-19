import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservaDTO } from '../DTO/create-reserva-dto';
import { ResponseReservaDTO } from '../DTO/response-reserva-dto';

@Injectable()
export class ReservaService {
    constructor(private prisma : PrismaService){}

    async realizarReserva(reservaData : CreateReservaDTO):Promise<ResponseReservaDTO>{
        return await this.prisma.reservas.create({
            data:{
                id : reservaData.id,
                State : reservaData.State,
                user_id : reservaData.user_id,
                apartamento_id : reservaData.apartamento_id
            }
        });
    }

    async eliminarReserva(id:number):Promise<ResponseReservaDTO>{
        const reserva = await this.prisma.reservas.findUnique({
            where : {
                id : id
            }
        })
        if(!reserva){
            throw new Error('Reserva no encontrada')
        }
        await this.prisma.reservas.delete({
            where : {
                id:id
            }
        })
        return{
            ...reserva
        }
    }
}
