import { IsNumber, IsString } from "class-validator";


export class ResponseComentarioDto{
    @IsNumber()
    usuario_id : number;

    

    @IsString()
    comentario : string;
    @IsString()
    username : string;
}