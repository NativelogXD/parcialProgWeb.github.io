import { defineStore } from 'pinia'
import { ref } from 'vue'
import { realizarReserva, quitarReserva } from '@/Services/ServiceReserva'
import type { Reserva } from '@/Interfaces/Reserva'
import type { User } from '@/Interfaces/User'
import type { Apartamento } from '@/Interfaces/Apartamento'

export const useReservaStore = defineStore('reservaStore', () => {
  // Estado
  const reservas = ref<Reserva[]>([]) // Lista de reservas
  const loading = ref(false) // Estado de carga
  const error = ref<string | null>(null) // Mensajes de error

  // Acción para realizar una reserva
  const addReserva = async (newUser: User, newApartamento: Apartamento) => {
    loading.value = true
    error.value = null
    try {
      const reserva = await realizarReserva(newUser, newApartamento)
      reservas.value.push(reserva) // Agrega la nueva reserva al estado
      console.log(reserva)
      return reserva;
     
      

    } catch (err) {
      error.value = 'Error al realizar la reserva'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Acción para quitar una reserva
  const removeReserva = async (index: number) => {
    loading.value = true
    error.value = null
    try {
      await quitarReserva(index) // Llama al servicio para eliminar la reserva
      // Filtra la reserva eliminada del estado
      reservas.value = reservas.value.filter(reserva => reserva.id !== index)
    } catch (err) {
      error.value = 'Error al quitar la reserva'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Retorna el estado y las acciones
  return {
    reservas,
    loading,
    error,
    addReserva,
    removeReserva,
  }
})
