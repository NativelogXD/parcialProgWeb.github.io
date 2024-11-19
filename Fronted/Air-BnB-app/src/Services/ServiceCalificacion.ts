//ServiceCalificacion.ts

import type { Calificacion } from "@/Interfaces/Calificacion";
import axios from "axios";

const Base_Url = 'http://localhost:3000/calificacionN';

export async function addCalificacion(calificacionData:Calificacion):Promise<Calificacion>{
    const response = await axios.post(`${Base_Url}`,calificacionData);
    return response.data;
}