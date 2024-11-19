import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChat } from '../dto/create-chat-dto';
import { ResponseChat } from '../dto/response-chat-dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // Método para guardar un mensaje en la base de datos
  async PostChat(createChat: CreateChat): Promise<ResponseChat> {
    const chatCreado = await this.prisma.mensajes.create({
      data: {
        remitente_id: createChat.remitente_id,
        destinatario_id: createChat.destinatario_id,
        mensaje: createChat.mensaje,
      },
    });

    return {
      remitente_id: chatCreado.remitente_id,
      destinatario_id: chatCreado.destinatario_id,
      mensaje: chatCreado.mensaje,
    };
  }
}
