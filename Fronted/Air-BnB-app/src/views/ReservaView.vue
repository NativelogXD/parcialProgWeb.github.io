<template>
  <div>
    <Reserva :user="user" :apartamentos="apartamentos" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/userStore' // Asegúrate de tener acceso al store del usuario
import Reserva from '@/components/Reserva.vue' // Importa el componente Reserva
import { useApartamentoStore } from '@/stores/apartamentoStore'
import type { Apartamento } from '@/Interfaces/Apartamento'
import type { User } from '@/Interfaces/User' // Asegúrate de tener la interfaz User

export default defineComponent({
  name: 'ReservaView',
  components: {
    Reserva, // Registra el componente Reserva
  },
  setup() {
    const userStore = useUserStore() // Accede al store del usuario
    const apartamentoStore = useApartamentoStore()

    return {
      user: userStore.user, // Pasa el usuario al componente Reserva
      apartamentos: apartamentoStore.apartamentos, // Lista de apartamentos
    }
  },
})
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
