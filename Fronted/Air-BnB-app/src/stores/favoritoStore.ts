import type { favorito } from "@/Interfaces/Favorito";
import { defineStore } from "pinia";
import { ref } from "vue";
import { addFavorito } from "@/Services/ServiceFavorito";



export const useFavoritosStore = defineStore('favoritoStore', () =>{
    const favoritos = ref<favorito[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const crearFavorito = async (idUser:number,idApartamento:number) => {
        loading.value = true;
        error.value = null;
        try{
            const crearFav = await addFavorito(idUser,idApartamento);
            favoritos.value.push(crearFav)
        }catch(err){
            error.value = 'Error al agregar a favoritos'
        } finally {
            loading.value = false
        }
    }
    return {
        favoritos,
        loading,
        error,
        crearFavorito
    }
})