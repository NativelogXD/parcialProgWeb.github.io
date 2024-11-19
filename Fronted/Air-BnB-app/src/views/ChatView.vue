<template>
  <div>
    <!-- Pasamos la propiedad user al componente Chat solo si user no es null -->
    <Chat v-if="user" :user="user" />
    <p v-else>Loading user...</p> <!-- Mensaje de carga mientras se obtiene el usuario -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Chat from '@/components/Chat.vue';
import { useUserStore } from '@/stores/userStore';
import type { User } from '@/Interfaces/User';

export default defineComponent({
  name: 'ChatView',
  components: { Chat },
  setup() {
    // Accede al store de usuario
    const userStore = useUserStore();

    // Se obtiene el usuario desde el store
    const user = userStore.user;

    // Si el usuario no está logueado o hay un error, puedes gestionar los estados aquí
    onMounted(() => {
      if (!user) {
        console.log("El usuario no está autenticado o no se ha cargado.");
      }
    });

    return {
      user,
    };
  },
});
</script>

<style scoped>
/* Estilos opcionales para la vista de chat */
</style>
