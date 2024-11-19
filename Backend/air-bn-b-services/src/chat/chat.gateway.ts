import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './service/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;
  public users: Map<number, string> = new Map();  // Mapa de usuarios conectados: { userId: socketId }

  constructor(private readonly chatService: ChatService) {}

  // Método para manejar el envío de mensajes
  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() message: { remitente_id: number; destinatario_id: number; mensaje: string },
    @ConnectedSocket() socket: Socket
  ): Promise<void> {
    const receiverSocketId = this.users.get(message.destinatario_id);

    // Guardar el mensaje en la base de datos
    await this.chatService.PostChat({
      remitente_id: message.remitente_id,
      destinatario_id: message.destinatario_id,
      mensaje: message.mensaje,
    });

    // Emitir el mensaje al destinatario
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('receive_message', message);
    }
  }

  // Método para registrar al usuario
  @SubscribeMessage('register')
  handleRegister(@MessageBody() userId: number, @ConnectedSocket() socket: Socket): void {
    // Registrar usuario en el mapa de usuarios conectados
    this.users.set(userId, socket.id);

    // Emitir la lista actualizada de usuarios conectados
    const userList = Array.from(this.users.keys());  // Extraer solo los IDs de usuario
    this.server.emit('update_users', userList);
  }

  // Método para manejar la desconexión de un usuario
  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() socket: Socket): void {
    // Eliminar usuario de la lista al desconectarse
    this.users.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        this.users.delete(userId);
      }
    });

    // Emitir la lista actualizada de usuarios conectados
    const userList = Array.from(this.users.keys());
    this.server.emit('update_users', userList);
  }
}
