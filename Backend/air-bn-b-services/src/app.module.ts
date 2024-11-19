import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './usuario/controller/usuario.controller';
import { UsuarioService } from './usuario/service/usuario.service';
import { PrismaService } from './prisma/prisma.service';
import { ApartamentoController } from './apartamento/controller/apartamento.controller';
import { ApartamentoService } from './apartamento/service/apartamento.service';
import { ReservaController } from './reserva/controller/reserva.controller';
import { ReservaService } from './reserva/service/reserva.service';
import { PagosController } from './pagos/controller/pagos.controller';
import { PagosService } from './pagos/service/pagos.service';
import { FavoritoController } from './favorito/controller/favorito.controller';
import { FavoritoService } from './favorito/service/favorito.service';
import { UbicacionController } from './ubicacion/controller/ubicacion.controller';
import { UbicacionService } from './ubicacion/service/ubicacion.service';
import { ComentarioController } from './comentario/controller/comentario.controller';
import { ComentarioService } from './comentario/service/comentario.service';
import { ImagenApartamentoController } from './imagen_apartamento/controller/imagen_apartamento.controller';
import { ImagenApartamentoService } from './imagen_apartamento/service/imagen_apartamento.service';
import { CalificacionController } from './calificacion/controller/calificacion.controller';
import { CalificacionService } from './calificacion/service/calificacion.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/service/chat.service';


@Module({
  imports: [],
  controllers: [AppController, UsuarioController, ApartamentoController, ReservaController, PagosController, FavoritoController, UbicacionController, ComentarioController, ImagenApartamentoController,CalificacionController],
  providers: [AppService,  UsuarioService, PrismaService, ApartamentoService, ReservaService, PagosService, FavoritoService, UbicacionService, ComentarioService, ImagenApartamentoService,CalificacionService,ChatGateway,ChatService],
})
export class AppModule {}
