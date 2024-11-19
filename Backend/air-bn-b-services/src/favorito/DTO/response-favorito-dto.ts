import { Optional } from "@nestjs/common";
import {  IsDate, IsInt } from "class-validator";


export class ResponseFavoritoDTO{

    @IsInt()
    usuario_id : number;

    @IsInt()
    apartamento_id : number;

    @Optional()
    @IsDate()
    fecha_agregado ?: Date;
}