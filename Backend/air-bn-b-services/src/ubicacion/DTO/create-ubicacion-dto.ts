import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateUbicacionDTO{
    @IsString()
    @IsNotEmpty()
    nombre : string;

    @IsString()
    @IsNotEmpty()
    descripcion : string;

    @IsOptional()
    @IsDate()
    fecha_creacion?: Date;

}