import { IsBoolean, IsNumber } from "class-validator";


export class ResponseReservaDTO{
    @IsNumber()
    id : number;

    @IsBoolean()
    State : boolean;

    @IsNumber()
    user_id: number;

    @IsNumber()
    apartamento_id : number;

}