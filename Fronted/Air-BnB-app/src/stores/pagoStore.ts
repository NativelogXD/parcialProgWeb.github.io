import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CreatePago } from '@/Services/ServicePago'  // Importa tu servicio de pago
import type { Pago } from '@/Interfaces/Pago'
import Apartamento from '@/components/Apartamento.vue'

export const usePagoStore = defineStore('pagoStore', () => {
  const pagos = ref<Pago[]>([])  // Lista de pagos
  const loading = ref(false)     // Estado de carga
  const error = ref<string | null>(null)  // Mensajes de error
  const reserva = ref(Apartamento || null) //



const addPago = async (monto: number, reservaId: number, metodoPago: string) => {
    loading.value = true
    error.value = null
    try {
    const newPago = await CreatePago(monto, reservaId, metodoPago)
      pagos.value.push(newPago)  // Agrega el nuevo pago al estado
    } catch (err) {
        error.value = 'Error al realizar el pago'
        console.error(err)
    } finally {
        loading.value = false
    }
}

  // Retorna el estado y las acciones
return {
    pagos,
    loading,
    error,
    addPago,
}
})
