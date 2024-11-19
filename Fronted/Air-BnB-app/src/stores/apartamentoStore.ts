import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  postApartamento,
  quitarApartamento,
  getAllApartamentos,
  getApartamentoByIndex,
} from '@/Services/ServiceApartamento'
import type { Apartamento } from '@/Interfaces/Apartamento'

export const useApartamentoStore = defineStore('apartamentoStore', () => {
  const apartamentos = ref<Apartamento[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const pageSize = ref(5)

  const fetchAllApartamento = async () => {
    loading.value = true
    error.value = null
    try {
      const AllApartamento = await getAllApartamentos()
      const startIndex = (currentPage.value - 1) * pageSize.value
      const endIndex = currentPage.value * pageSize.value
      const paginatedApartamento = AllApartamento.slice(startIndex, endIndex)
      apartamentos.value.push(...paginatedApartamento)
      currentPage.value++
    } catch (err) {
      error.value = 'Error al obtener los apartamentos'
    } finally {
      loading.value = false
    }
  }

  const addApartamento = async (newApartamento: Apartamento) => {
    loading.value = true
    error.value = null
    try {
      const createdApartamento = await postApartamento(newApartamento)
      
      apartamentos.value.push(createdApartamento)
    } catch (err) {
      error.value = 'Error al agregar el apartamento'
    } finally {
      loading.value = false
    }
  }

  const deleteApartamento = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await quitarApartamento(id)
      apartamentos.value = apartamentos.value.filter(
        apartamento => apartamento.id !== id,
      )
    } catch (err) {
      error.value = 'Error al eliminar el apartamento'
    } finally {
      loading.value = false
    }
  }

  const fetchApartamentoById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const apartamento = await getApartamentoByIndex(id) 
      return apartamento
    } catch (err) {
      error.value = 'Error al obtener el apartamento'
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    apartamentos,
    loading,
    error,
    addApartamento,
    deleteApartamento,
    fetchAllApartamento,
    fetchApartamentoById
  }
})
