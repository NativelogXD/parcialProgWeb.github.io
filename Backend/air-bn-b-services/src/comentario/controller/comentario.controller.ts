import { Body, Controller, Post } from '@nestjs/common';
import { ComentarioService } from '../service/comentario.service';
import { CreateComentarioDto } from '../DTO/create-comentario-dto';
import { ResponseComentarioDto } from '../DTO/response-comentario-dto';

@Controller('comentario')
export class ComentarioController {
    constructor(private readonly comentarioService : ComentarioService){}

    @Post()
    async PostComentario(@Body() comentarioData:CreateComentarioDto):Promise<ResponseComentarioDto>{
        return this.comentarioService.PostComentario(comentarioData);
    }
}
