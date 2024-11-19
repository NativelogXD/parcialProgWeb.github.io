import { Body, Controller, Post } from '@nestjs/common';
import { FavoritoService } from '../service/favorito.service';
import { CreateFavoritoDTO } from '../DTO/create-favorito-dto';
import { ResponseFavoritoDTO } from '../DTO/response-favorito-dto';

@Controller('favorito')
export class FavoritoController {
    constructor(private readonly favoritoService : FavoritoService){}

    @Post()
    async AddFavorito(@Body() dataFavorito: CreateFavoritoDTO):Promise<ResponseFavoritoDTO>{
        return this.favoritoService.AddFavotiro(dataFavorito);
    }
}
