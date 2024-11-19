import { IsNumber, IsString } from "class-validator";

export class ResponseCalificacionDto{
    @IsNumber()
    usuario_id : number;

   
    
    @IsNumber()
   
    puntuacion : number;

    @IsString()
    
    comentario : string;
}


