import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";


export class ResponseImagen_ApartamentoDTO{
    @IsNumber()
    apartamento_id : number;

    @IsString()
    url_imagen : string;

    @IsOptional()
    @IsDate()
    fecha_subida?: Date
}