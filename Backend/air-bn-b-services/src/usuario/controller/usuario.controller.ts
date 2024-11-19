import { Body, Controller, Delete, Get, Post, Query} from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { ResponseUsuarioDTO } from '../DTO/response-usuario-dto';
import { CreateUsuarioDTO } from '../DTO/create-usuario-dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService){}

    @Get()
    async getUsuarioByUserNameAndPassword(@Query('username') username: string, password: string,): Promise<ResponseUsuarioDTO> {
            return await this.usuarioService.usuarioByUserNameAndPassword(username, password);
    }

    @Get()
    async getUsuarioByUserName(@Query('username') username): Promise<ResponseUsuarioDTO> {
            return await this.usuarioService.usuarioByUserName(username);
    }

    @Post()
    async createUsuario(@Body() usuarioData: CreateUsuarioDTO):Promise<ResponseUsuarioDTO>{
        return this.usuarioService.createUsuario(usuarioData);
    }

    @Delete()
    async eliminarUsuario(@Query('username') username:string, password:string):Promise<ResponseUsuarioDTO>{
            return await this.usuarioService.eliminarUsuario(username, password);
    }
}
