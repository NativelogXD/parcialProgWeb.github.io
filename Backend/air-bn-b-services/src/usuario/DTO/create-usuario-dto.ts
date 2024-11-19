import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDTO{
    @IsString()
    @IsNotEmpty()
    UserName : string;

    @IsString()
    @IsNotEmpty()
    Name : string;

    @IsString()
    @IsNotEmpty()
    Password : string;

    @IsString()
    @IsNotEmpty()
    Email : string;

    @IsString()
    @IsNotEmpty()
    Phone : string;
}