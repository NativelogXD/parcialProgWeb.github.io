import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { CreateChat } from '../dto/create-chat-dto';
import { ResponseChat } from '../dto/response-chat-dto';
import { ChatGateway } from '../chat.gateway';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway, // Inyectar el Gateway
  ) {}

  // Endpoint para agregar un chat y guardarlo en la base de datos
  @Post('add')
  async AddChat(@Body() dataChat: CreateChat): Promise<ResponseChat> {
    return this.chatService.PostChat(dataChat); // Llama al método PostChat del servicio
  }

  // Endpoint para enviar un mensaje directamente
  @Post('send')
  async SendMessage(
    @Body() dataChat: { senderId: number; receiverId: number; text: string },
  ): Promise<void> {
    // Guardar mensaje en la base de datos
    await this.chatService.PostChat({
      remitente_id: dataChat.senderId,
      destinatario_id: dataChat.receiverId,
      mensaje: dataChat.text,
    });

    // Emitir el mensaje usando el Gateway
    this.chatGateway.server.emit('send_message', dataChat);
  }

  // Endpoint para registrar un usuario en el WebSocket
  @Post('register')
  async RegisterUser(
    @Body() data: { userId: number; socketId: string },
  ): Promise<void> {
    // Llama al método del Gateway para registrar el usuario
    this.chatGateway.users.set(data.userId, data.socketId);
  }
}
