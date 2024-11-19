import { Controller, Post, Body, Delete, Query } from '@nestjs/common';
import { ReservaService } from '../service/reserva.service';
import { CreateReservaDTO } from '../DTO/create-reserva-dto';
import { ResponseReservaDTO } from '../DTO/response-reserva-dto';

@Controller('reserva')
export class ReservaController {
    constructor(private readonly reservaService: ReservaService){}

    @Post()
    async crearReerva(@Body() resevaData:CreateReservaDTO):Promise<ResponseReservaDTO>{
        return await this.reservaService.realizarReserva(resevaData);
    }

    @Delete()
    async eliminarReserva(@Query('id') id:number):Promise<ResponseReservaDTO>{
        return await this.reservaService.eliminarReserva(id);
    }
}
