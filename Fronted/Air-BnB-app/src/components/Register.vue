<template>
  <div class="register-container">
    <h1>Registro</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Nombre de Usuario</label>
        <input
          type="text"
          v-model="newUser.UserName"
          id="username"
          required
          placeholder="Ingrese su nombre de usuario"
        />
      </div>
      <div class="form-group">
        <label for="name">Nombre Completo</label>
        <input
          type="text"
          v-model="newUser.Name"
          id="name"
          required
          placeholder="Ingrese su nombre completo"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="newUser.Email"
          id="email"
          required
          placeholder="Ingrese su email"
        />
      </div>
      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input
          type="text"
          v-model="newUser.Phone"
          id="phone"
          required
          placeholder="Ingrese su número de teléfono"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          v-model="newUser.Password"
          id="password"
          required
          placeholder="Ingrese su contraseña"
        />
      </div>
      <button type="submit" class="register-btn">Register</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserStore } from '@/stores/userStore' // Ajusta la ruta según tu estructura
import type { User } from '@/Interfaces/User'
import { useRouter } from 'vue-router' // Asegúrate de que la ruta es correcta

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const errorMessage = ref('')
    const newUser = ref<User>({
      UserName: '',
      Name: '',
      Password: '',
      Email: '',
      Phone: '',
    })
    //registro usuario 
    const handleRegister = async () => {
      try {
        await userStore.register(newUser.value)
        // Aquí puedes redirigir al usuario a otra vista después del registro exitoso
      } catch (error) {
        errorMessage.value = 'Error al intentar registrar al usuario.'
      }
    }
    return {
      newUser,
      errorMessage,
      handleRegister,
    }
  },
})
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
}

h1 {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.register-btn {
  background-color: #4caf50;
  color: white;
  transition: background-color 0.3s ease;
}

.register-btn:hover {
  background-color: #45a049;
}

.create-apartment-btn {
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.create-apartment-btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
