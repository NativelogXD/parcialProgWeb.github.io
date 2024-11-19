import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCalificacionDto {



    @IsNumber()
    @IsNotEmpty()
    apartamento_id : number;

    @IsNumber()
    @IsNotEmpty()

    
    usuario_id : number;

    @IsNumber()
    @IsNotEmpty()
    puntuacion : number;

    @IsString()
    @IsNotEmpty()
    comentario : string;

    @IsOptional()
    @IsDate()
    fecha_calificacion?: Date;
}
