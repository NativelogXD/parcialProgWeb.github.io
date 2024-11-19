import { IsInt, IsString } from "class-validator";

export class ResponseChat {
    
    @IsInt()
    
    remitente_id;

    @IsInt()
    
    
    destinatario_id: number;
    
    @IsString()
    
    mensaje: string;
}