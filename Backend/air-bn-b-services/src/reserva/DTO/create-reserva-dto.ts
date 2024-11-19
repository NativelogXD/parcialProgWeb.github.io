import { IsBoolean, IsNotEmpty, IsNumber} from "class-validator";


export class CreateReservaDTO{
    @IsNumber()
    id: number;

    @IsBoolean()
    @IsNotEmpty()
    State : boolean;

    @IsNumber()
    user_id : number;

    @IsNumber()
    apartamento_id : number;

}