import { Body, Controller, Post } from '@nestjs/common';
import { PagosService } from '../service/pagos.service';
import { CreatePagoDto } from '../DTO/create-pago-dto';
import { ResponsetePagoDto } from '../DTO/response-pago-dto';

@Controller('pago')
export class PagosController {
    constructor (private readonly pagoService : PagosService){}

    @Post()
    async PostPago(@Body() dataPago : CreatePagoDto): Promise<ResponsetePagoDto>{
        return this.pagoService.AgregarPago(dataPago);
    }

}
