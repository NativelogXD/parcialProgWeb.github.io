import type { ImagenApartamento } from "@/Interfaces/ImagenApartamento";
import axios from "axios";


const Base_Url = 'http://localhost:3000/imagen-apartamento'

export async function PostApartamentoImagen(dataImagen:ImagenApartamento):Promise<ImagenApartamento>{
    const response = await axios.post(`${Base_Url}`,dataImagen);
    return response.data
}