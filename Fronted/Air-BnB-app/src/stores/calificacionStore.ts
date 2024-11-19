//calificacionStore.ts

import type { Calificacion } from "@/Interfaces/Calificacion";
import { addCalificacion } from "@/Services/ServiceCalificacion";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCalificacionStore = defineStore('calificacionStore', ()=>{


    const calificaciones =ref <Calificacion[]>([])
    const loading = ref(false)
  const error = ref<string | null>(null)



    const crearCalificacion = async(calificacionData :Calificacion)=>{
    loading.value = true
    error.value = null


try{

    const crearFav = await addCalificacion(calificacionData)
    calificaciones.value.push(crearFav)
} catch (err) {
    error.value = 'Error al agregar un comentario'
  } finally {
    loading.value = false
  }
}
   return{
    calificaciones,
    loading,
    error,
    crearCalificacion,
   


    }
})