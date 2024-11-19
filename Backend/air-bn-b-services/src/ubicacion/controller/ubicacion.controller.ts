import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UbicacionService } from '../service/ubicacion.service';
import { ResponseUbicacion } from '../DTO/response-ubicacion-dto';
import { CreateUbicacionDTO } from '../DTO/create-ubicacion-dto';

@Controller('ubicacion')
export class UbicacionController {
    constructor(private readonly ubicacionService: UbicacionService){}

    @Get('getAll')
    async getAllUbicaciones():Promise<ResponseUbicacion[]>{
        return this.ubicacionService.AllUbicaciones();
    }

    @Get('getId')
    async getUbicacionByIndex(@Query('id') id:number):Promise<ResponseUbicacion>{
        return this.ubicacionService.GetUbicacionesByIndex(id);
    }

    @Post()
    async postUbicacion(@Body() ubicacion:CreateUbicacionDTO):Promise<ResponseUbicacion>{
        return this.ubicacionService.PostUbicacion(ubicacion);
    }

    @Delete()
    async deleteUbicacion(@Query('id') id:number):Promise<ResponseUbicacion>{
        return this.ubicacionService.DeleteUbicacion(id);
    }
}
