import { IsString } from "class-validator";

export class ResponseUsuarioDTO{
    @IsString()
    UserName : string;

    @IsString()
    Name : string;

    @IsString()
    Password : string;

    @IsString()
    Email : string;

    @IsString()
    Phone : string;
}