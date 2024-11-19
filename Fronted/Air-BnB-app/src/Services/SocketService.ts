import { io, Socket } from 'socket.io-client';

export class SocketService {
  private socket: Socket;

  constructor() {
    // Conéctate al servidor de Socket.IO en el backend
    this.socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor
  }

  // Método para enviar mensajes
  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  // Método para recibir mensajes
  onMessage(callback: (message: string) => void) {
    this.socket.on('message', callback);
  }

  // Método para desconectar
  disconnect() {
    this.socket.disconnect();
  }
}
