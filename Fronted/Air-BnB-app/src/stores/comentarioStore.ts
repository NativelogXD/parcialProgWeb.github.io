import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addComentario } from '@/Services/ServiceComentario'
import type { Comentario } from '@/Interfaces/Comentario'

export const usecomentarioStore = defineStore('comentarioStore', () => {
  const comentarios = ref<Comentario[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const crearComentario = async (comentarioData:Comentario
  ) => {
    loading.value = true
    error.value = null
    try {
      const crearFav = await addComentario(comentarioData)
      comentarios.value.push(crearFav)
    } catch (err) {
      error.value = 'Error al agregar un comentario'
    } finally {
      loading.value = false
    }
  }
  return {
    comentarios,
    loading,
    error,
    crearComentario,
  }
})