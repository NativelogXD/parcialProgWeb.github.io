<template>
  <div>
    <Apartamento />
    <p v-if="userStore.loading">Cargando...</p>
    <p v-if="userStore.error">{{ userStore.error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Apartamento from '@/components/Apartamento.vue'
import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  name: 'ApartamentoView',
  components: { Apartamento },
  setup() {
    const userStore = useUserStore()
    return {
      userStore,
    }
  },
})
</script>
