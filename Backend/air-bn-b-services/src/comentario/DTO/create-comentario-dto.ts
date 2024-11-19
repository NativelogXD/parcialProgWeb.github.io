import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateComentarioDto{
    @IsNumber()
    @IsNotEmpty()
    apartamento_id : number;

    @IsNumber()
    @IsNotEmpty()
    usuario_id : number;

    

    @IsString()
    @IsNotEmpty()
    comentario : string;

    @IsOptional()
    @IsDate()
    fecha_comentario?: Date;
    @IsString()
    @IsNotEmpty()
    username : string;
}