import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateImagen_ApartamentoDTO{
    @IsNumber()
    @IsNotEmpty()
    apartamento_id : number;

    @IsString()
    @IsNotEmpty()
    url_imagen : string;

    @IsOptional()
    @IsDate()
    fecha_subida?: Date
}