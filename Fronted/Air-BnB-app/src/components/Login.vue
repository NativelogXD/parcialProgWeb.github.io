<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="Ingrese su nombre de usuario"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Ingrese su contraseña"
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="userStore.loading">Cargando...</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { getUsuarioByUserName } from '@/Services/ServiceUser'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()
//logueo
    const handleLogin = async () => {
      errorMessage.value = ''
      try {
        const user = await userStore.login(username.value, password.value)
        const usuarioEncontrado = await getUsuarioByUserName(
          username.value,
          password.value,
        )
        if (
          username.value == 'admin' &&
          password.value == '123'
        ) {
          router.push('/Apartamento')
        } else {
          if (!user) {
            router.push('/register')
          } else {
            router.push('/reserva')
          }
        }
      } catch (error) {
        errorMessage.value = 'Error al intentar iniciar sesión.'
      }
    }

    return {
      username,
      password,
      errorMessage,
      handleLogin,
      userStore, // Asegúrate de que esto está disponible en el template
    }
  },
})
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  text-align: center;
}
</style>
