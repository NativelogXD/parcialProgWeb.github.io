import type { favorito } from "@/Interfaces/Favorito";
import axios from "axios";


const Base_Url = 'http://localhost:3000/favorito'

export async function addFavorito(idUser:number,idApartamento:number):Promise<favorito>{
    const newFav = {
        usuario_id : idUser,
        apartamento_id : idApartamento,
        fecha_agregado : new Date()
    }
    const response = await axios.post(`${Base_Url}`,newFav);
    return response.data
}