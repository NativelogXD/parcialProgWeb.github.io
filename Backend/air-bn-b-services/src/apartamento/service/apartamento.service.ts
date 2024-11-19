import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseApartamentoDTO } from '../DTO/response-apartamento-dto';
import { CreateApartamentoDTO } from '../DTO/create-apartamento-dto';
import { ResponseApartamentoIDDTO } from '../DTO/response.apartamenteId-dto';

@Injectable()
export class ApartamentoService {
    constructor(private prisma: PrismaService){}

    async AllApartamentos():Promise<ResponseApartamentoIDDTO[]>{
        return await this.prisma.apartamentos.findMany();
    }

    async GetApartamentoByIndex(id:number):Promise<ResponseApartamentoIDDTO>{
        return await this.prisma.apartamentos.findUnique({
            where : {
                id : id
            }
        })
    }

    async PostApartamento(newApartamento:CreateApartamentoDTO):Promise<ResponseApartamentoDTO>{
        return this.prisma.apartamentos.create({
            data : {
                titulo : newApartamento.titulo,
                descripcion : newApartamento.descripcion,
                ubicacion : newApartamento.ubicacion,
                disponibilidad : newApartamento.disponibilidad,
                imagen : newApartamento.imagen,
                precio : newApartamento.precio
            }
        });
    }

    async DeleteApartamento(id : number): Promise<ResponseApartamentoDTO>{
        const apartamento = await this.prisma.apartamentos.findFirst({
            where : {
                id : id,
            }
        });
        if(!apartamento){
            throw new Error('Apartamento no encontrado');
        }
        await this.prisma.apartamentos.delete({
                where : {
                    id : id
                }
        });
        return {
            ...apartamento
        }
    }
}
