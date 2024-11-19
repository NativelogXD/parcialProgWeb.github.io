import type { Comentario } from "@/Interfaces/Comentario";
import axios from "axios";


const Base_Url = 'http://localhost:3000/comentario';

export async function addComentario(comentarioData:Comentario):Promise<Comentario>{
    const response = await axios.post(`${Base_Url}`,comentarioData);
    return response.data;
}