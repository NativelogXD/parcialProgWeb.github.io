<template>
  <div>
    <Login :user="userStore.user" />
    <p v-if="userStore.loading">Cargando...</p>
    <p v-if="userStore.error">{{ userStore.error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Login from '@/components/Login.vue'
import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  name: 'LoginView',
  components: { Login },
  setup() {
    const userStore = useUserStore()
    return {
      userStore,
    }
  },
})
</script>
