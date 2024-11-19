import { IsDate, IsInt, IsString } from "class-validator";


export class ResponseUbicacion{
    @IsInt()
    id : number;

    @IsString()
    nombre : string;

    @IsString()
    descripcion : string;

    @IsDate()
    fecha_creacion?: Date;
}