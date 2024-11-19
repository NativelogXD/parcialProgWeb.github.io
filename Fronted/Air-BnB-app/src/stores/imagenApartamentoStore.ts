import { defineStore } from 'pinia'
import { ref } from 'vue'
import {  PostApartamentoImagen } from '@/Services/ServiceImagenApartamento'
import type { ImagenApartamento } from '@/Interfaces/ImagenApartamento'

export const useApartamentoImagenStore = defineStore('apartamentoImagenStore', () => {
  const imagenApartamento = ref<ImagenApartamento[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const addApartamentoImage = async (apartamento :ImagenApartamento) => {
    loading.value = true
    error.value = null
    try {
      const createdApartamentoImagen = await  PostApartamentoImagen(apartamento)
      imagenApartamento.value.push(createdApartamentoImagen)
    } catch (err) {
      error.value = 'Error al agregar el apartamento'
    } finally {
      loading.value = false
    }
  }

  return {
    imagenApartamento,
    loading,
    error,
    addApartamentoImage,
  }
})