import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApartamentoService } from '../service/apartamento.service';
import { ResponseApartamentoDTO } from '../DTO/response-apartamento-dto';
import { CreateApartamentoDTO } from '../DTO/create-apartamento-dto';
import { ResponseApartamentoIDDTO } from '../DTO/response.apartamenteId-dto';

@Controller('apartamento')
export class ApartamentoController {

    constructor(private readonly apartamentoService : ApartamentoService){}

    @Get()
    async GetAllApartamentos():Promise<ResponseApartamentoIDDTO[]>{
        return this.apartamentoService.AllApartamentos();
    }

    @Get()
    async GetApartamento(@Query('id') id:number):Promise<ResponseApartamentoIDDTO>{
        return this.apartamentoService.GetApartamentoByIndex(id);
    }

    @Post()
    async PostApartamento(@Body() apartamentoData : CreateApartamentoDTO):Promise<ResponseApartamentoDTO>{
        return this.apartamentoService.PostApartamento(apartamentoData);
    }

    @Delete()
    async DeleteApartamento(@Query('id') id : number):Promise<ResponseApartamentoDTO>{
        return this.apartamentoService.DeleteApartamento(id);
    }
}
