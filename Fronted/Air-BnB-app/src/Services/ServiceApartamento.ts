import axios from 'axios'
import type { Apartamento } from '@/Interfaces/Apartamento'

const Base_Url = 'http://localhost:3000/apartamento'

// Función para obtener un apartamento por su índice
export async function getApartamentoByIndex(index: number): Promise<Apartamento | null> {
  try {
    const response = await axios.get(`${Base_Url}?id=${index}`);
    // Si la respuesta es un array, buscamos el apartamento con el id correspondiente
    if (Array.isArray(response.data)) {
      return response.data.find((apartamento: Apartamento) => apartamento.id === index) || null;
    }
    return response.data; // Si la respuesta es un objeto único, lo devolvemos directamente
  } catch (error) {
    return null; // Maneja el error según sea necesario
  }
}
// Función para crear un nuevo apartamento
export async function postApartamento(newApartamento: Apartamento,): Promise<Apartamento> {
  const response = await axios.post(`${Base_Url}`, newApartamento)
  return response.data
}
export async function quitarApartamento(index: number): Promise<Apartamento> {
  const response = await axios.delete(`${Base_Url}?id=${index}`)
  return response.data
}

export async function getAllApartamentos(): Promise<Apartamento[]> {
  const response = await axios.get(`${Base_Url}`)
  return response.data
}
