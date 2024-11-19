import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUsuarioByUserName, postUser } from '@/Services/ServiceUser'
import type { User } from '@/Interfaces/User'

function encontrarUsuario(UserName: string, Password: string) {
  return getUsuarioByUserName(UserName, Password)
}

export const useUserStore = defineStore('userStore', () => {


  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  
  const login = async (UserName: string, Password: string) => {
    loading.value = true
    error.value = null
    try {
      const fetchedUser = await getUsuarioByUserName(UserName, Password)
      if (fetchedUser) {
        user.value = fetchedUser
        return user
      } else {
        error.value = 'Usuario o contraseña incorrectos'
      }
    } catch (err) {
      error.value = 'Error al intentar inicial sesion'
    } finally {
      loading.value = false
    }
  }
  const register = async (newUser: User) => {
    loading.value = true
    error.value = null
    try {
      const createdUser = await postUser(newUser)
      if (createdUser) {
        user.value = createdUser
        return user
      } else {
        error.value = 'Error al registrar un nuevo usuario'
      }
    } catch (err) {
      error.value = 'Error al crear al usuario'
    } finally {
      loading.value = false
    }
  }
  const logout = () => {
    user.value = null
  }
  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    encontrarUsuario
  }
})
