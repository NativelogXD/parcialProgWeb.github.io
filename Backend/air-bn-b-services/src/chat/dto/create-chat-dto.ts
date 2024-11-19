import { Optional } from "@nestjs/common";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateChat {
    
    @IsInt()
    @IsNotEmpty()
    remitente_id : number;

    @IsInt()
    @IsNotEmpty()

    destinatario_id: number;
    @IsNotEmpty()
    @IsString()
    mensaje: string;

    @Optional()
    @IsDate()
    fecha_mensaje ?: Date;

}