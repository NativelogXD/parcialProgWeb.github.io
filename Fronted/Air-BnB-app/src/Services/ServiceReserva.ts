import axios from 'axios'
import type { Reserva } from '@/Interfaces/Reserva'
import type { User } from '@/Interfaces/User'
import type { Apartamento } from '@/Interfaces/Apartamento'

const Base_Url = 'http://localhost:3000/reserva'

export async function realizarReserva(
  newUser: User,
  newApartamento: Apartamento,
): Promise<Reserva> {
  const nuevaReserva = {
    State: true,
    user_id: newUser.id,
    apartamento_id: newApartamento.id,
  };
  console.log(nuevaReserva)
  const response = await axios.post(`${Base_Url}`,nuevaReserva)
  console.log(response)
  return response.data
}

export async function quitarReserva(index: number): Promise<Reserva> {
  const response = await axios.delete(`${Base_Url}?id=${index}`)
  return response.data
}
