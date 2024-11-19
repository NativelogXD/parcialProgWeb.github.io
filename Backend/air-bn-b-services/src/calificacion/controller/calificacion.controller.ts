//calificacion.controller

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalificacionService } from '../service/calificacion.service';
import { CreateCalificacionDto } from '../dto/create-calificacion.dto';
import { ResponseCalificacionDto } from '../dto/response-calificacion-dto';


@Controller('calificacionN')
export class CalificacionController {
  constructor(private readonly calificacionService: CalificacionService) {}

  @Post()
    async PostCalificacion(@Body() calificacionData:CreateCalificacionDto):Promise<ResponseCalificacionDto>{
        return this.calificacionService.PostCalificacion(calificacionData);
    }
}
