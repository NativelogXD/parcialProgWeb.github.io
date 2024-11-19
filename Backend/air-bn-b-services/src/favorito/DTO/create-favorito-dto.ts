import { Optional } from "@nestjs/common";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";


export class CreateFavoritoDTO{

    @IsInt()
    @IsNotEmpty()
    usuario_id : number;

    @IsInt()
    @IsNotEmpty()
    apartamento_id : number;

    @Optional()
    @IsDate()
    fecha_agregado  ?: Date;

}