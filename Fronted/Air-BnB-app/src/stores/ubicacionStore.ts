// useUbicacionStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
getAllUbicaciones,
postUbicacion,
deleteUbicacion,
getUbicacionByIndex
} from '@/Services/ServiceUbicacion'
import type { Ubicacion } from '@/Interfaces/Ubicacion'

export const useUbicacionStore = defineStore('ubicacionStore', () => {
  // Estado
  const ubicaciones = ref<Ubicacion[]>([]) // Array de ubicaciones
  const ubicacion = ref<Ubicacion | null>(null) // Ubicación individual para obtener por ID
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Acción para obtener todas las ubicaciones
  const fetchAllUbicaciones = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await getAllUbicaciones()
      ubicaciones.value = response || [] // Almacena el array de ubicaciones
    } catch (err) {
      error.value = 'Error al obtener ubicaciones'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Acción para obtener una ubicación específica por ID
  const fetchUbicacionById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await getUbicacionByIndex(id)
      ubicacion.value = response || null // Almacena la ubicación obtenida
    } catch (err) {
      error.value = `Error al obtener la ubicación con ID ${id}`
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Acción para agregar una nueva ubicación
  const addUbicacion = async (newUbicacion: Ubicacion) => {
    loading.value = true
    error.value = null
    try {
      const response = await postUbicacion(newUbicacion)
      ubicaciones.value.push(response) // Agrega la nueva ubicación al array
    } catch (err) {
      error.value = 'Error al agregar la nueva ubicación'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Acción para eliminar una ubicación por ID
  const removeUbicacion = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await deleteUbicacion(id)
      // Elimina del array la ubicación con el ID especificado
      ubicaciones.value = ubicaciones.value.filter(u => u.id !== id)
    } catch (err) {
      error.value = `Error al eliminar la ubicación con ID ${id}`
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Retorna el estado y las acciones
  return {
    ubicaciones, // Lista de todas las ubicaciones
    ubicacion, // Una sola ubicación para detalles
    loading,
    error,
    fetchAllUbicaciones,
    fetchUbicacionById,
    addUbicacion,
    removeUbicacion,
  }
})