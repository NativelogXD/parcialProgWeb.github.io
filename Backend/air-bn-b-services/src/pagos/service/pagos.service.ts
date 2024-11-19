import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePagoDto } from '../DTO/create-pago-dto';
import { ResponsetePagoDto } from '../DTO/response-pago-dto';
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class PagosService {
    constructor(private prisma: PrismaService){}

    async AgregarPago(pago : CreatePagoDto):Promise<ResponsetePagoDto>{
        const montoDecimal = new Decimal(pago.monto); // Convertir monto a Decimal
        const pagoCreado = await this.prisma.pagos.create({
            data: {
               
                monto: montoDecimal,
                metodo_pago: pago.metodo_pago,
                fecha_pago: pago.fecha_pago || new Date(), 
                reserva_id: pago.reserva_id // Usar fecha actual si no se pasa una fecha
            },
        });
        // Aquí puedes mapear la respuesta a un DTO si es necesario
        return {
            
            monto: pagoCreado.monto,  // Convierte el Decimal a string si es necesario en la respuesta
            metodo_pago: pagoCreado.metodo_pago,
            fecha_pago: pagoCreado.fecha_pago,
            reserva_id: pagoCreado.reserva_id
        };
    }
}
