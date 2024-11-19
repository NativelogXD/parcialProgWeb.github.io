import { Decimal } from "@prisma/client/runtime/library";
import { IsBoolean, IsInt,  IsString } from "class-validator";

export class ResponseApartamentoIDDTO{
    @IsInt()
    id : number;
    
    @IsString()
    titulo : string;

    @IsString()
    descripcion : string;

    @IsString()
    ubicacion : string;

    @IsBoolean()
    disponibilidad : boolean;

    @IsString()
    imagen : string;

    @IsInt()
    precio : Decimal;
}