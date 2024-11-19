import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateApartamentoDTO{
    @IsString()
    @IsNotEmpty()
    titulo : string;

    @IsString()
    @IsNotEmpty()
    descripcion : string;

    @IsString()
    @IsNotEmpty()
    ubicacion : string;

    @IsBoolean()
    @IsNotEmpty()
    disponibilidad : boolean;

    @IsString()
    @IsNotEmpty()
    imagen : string;

    @IsInt()
    @IsNotEmpty()
    precio : number;
}