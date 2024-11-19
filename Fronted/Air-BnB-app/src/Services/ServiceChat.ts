import axios from "axios";
import { io } from "socket.io-client";

// URL base de la API
const Base_Url = 'http://localhost:3000/chat'; // Cambié a '/chat' según el controlador

// Crear una instancia de Socket.IO
const socket = io('http://localhost:3000');

// Función para agregar un comentario (mensaje) en la base de datos
async function saveMessageToDatabase(comentarioData: { remitente_id: number, destinatario_id: number, mensaje: string }) {
  try {
    // Enviar el mensaje al backend para guardarlo en la base de datos
    const response = await axios.post(Base_Url + '/add', comentarioData);
    return response.data;  // Devuelvo la respuesta para que se pueda manejar en el componente
  } catch (error) {
    console.error("Error al guardar el mensaje:", error);
    throw new Error("No se pudo guardar el mensaje");
  }
}

// Función para emitir el mensaje por WebSocket
function sendMessageOverSocket(comentarioData: { remitente_id: number, destinatario_id: number, mensaje: string }) {
  try {
    // Emitir el mensaje al destinatario a través de WebSocket
    socket.emit('send_message', {
      senderId: comentarioData.remitente_id,
      receiverId: comentarioData.destinatario_id,
      text: comentarioData.mensaje
    });
  } catch (error) {
    console.error("Error al enviar el mensaje por WebSocket:", error);
    throw new Error("No se pudo enviar el mensaje por WebSocket");
  }
}

// Exponer las funciones para ser utilizadas por los componentes
export const chatService = {
  saveMessageToDatabase,
  sendMessageOverSocket,
};
