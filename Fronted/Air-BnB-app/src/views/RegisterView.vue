<template>
  <div>
    <Register :user="userStore.user" />
    <p v-if="userStore.loading">Cargando...</p>
    <p v-if="userStore.error">{{ userStore.error }}</p>
    <button @click="goBack" class="back-btn">Atrás</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/userStore'
import Register from '@/components/Register.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterView',
  components: {
    Register,
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const goBack = () => {
      router.push('/') // Ajusta la ruta si es diferente
    }

    return {
      userStore,
      goBack,
    }
  },
})
</script>

<style scoped>
.back-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #555;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #333;
}
</style>
