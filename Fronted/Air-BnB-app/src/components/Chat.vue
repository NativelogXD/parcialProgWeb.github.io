<template>
    <div>
      <h1>Bienvenido al chat</h1>
      <div v-if="usersList.length > 0">
        <h3>Usuarios Conectados:</h3>
        <ul>
          <li v-for="(user, index) in usersList" :key="index">
            {{ user }} <!-- Mostrar el ID del usuario o el nombre -->
            <button @click="selectUser(user)">Enviar mensaje</button>
          </li>
        </ul>
      </div>
      <div>
        <input v-model="message" placeholder="Escribe un mensaje..." />
        <button @click="sendMessage">Enviar</button>
      </div>
      <div>
        <ul>
          <li v-for="(msg, index) in messages" :key="index">
            {{ msg }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { io } from 'socket.io-client';
  
  export default {
    name: 'Chat',
    props: {
      user: Object,  // El usuario que se pasa como prop
    },
    setup(props) {
      const socket = io('http://localhost:3000');  // Conectar al servidor de Socket.IO
      const message = ref('');  // Mensaje actual que el usuario escribe
      const messages = ref([]);  // Lista de mensajes recibidos
      const usersList = ref([]);  // Lista de usuarios conectados
      const selectedReceiver = ref(null);  // Usuario seleccionado para enviar el mensaje
  
      // Cuando el componente se monta
      onMounted(() => {
        // Emitir el evento para registrar al usuario al conectarse
        socket.emit('register', props.user.id);  // El `user.id` es el identificador único del usuario
  
        // Escuchar cuando la lista de usuarios conectados se actualiza
        socket.on('update_users', (connectedUsers) => {
          usersList.value = connectedUsers;
        });
  
        // Escuchar nuevos mensajes
        socket.on('receive_message', (msg) => {
          messages.value.push(msg.mensaje);  // Agregar el mensaje a la lista
        });
      });
  
      // Función para seleccionar el destinatario
      const selectUser = (userId) => {
        selectedReceiver.value = userId;
      };
  
      // Función para enviar un mensaje
      const sendMessage = () => {
        if (message.value.trim() && selectedReceiver.value) {
          const msg = {
            remitente_id: props.user.id,
            destinatario_id: selectedReceiver.value,
            mensaje: message.value,
          };
  
          // Agregar el mensaje a la lista de mensajes para el remitente
          messages.value.push(`Tú: ${message.value}`); // Mostrar el mensaje del remitente
  
          // Emitir el mensaje al servidor para que lo reciba el destinatario
          socket.emit('send_message', msg);
          message.value = '';  // Limpiar el campo de mensaje
        }
      };
  
      return {
        message,
        messages,
        usersList,
        sendMessage,
        selectUser,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Agrega tus estilos aquí */
  </style>
  