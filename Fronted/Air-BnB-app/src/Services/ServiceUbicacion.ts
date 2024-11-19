import type { Ubicacion } from "@/Interfaces/Ubicacion";
import axios from "axios"


const Base_url = 'http://localhost:3000/ubicacion'

export async function getAllUbicaciones():Promise<Ubicacion[]|null>{
    try{
        const response = await axios.get(`${Base_url}/getAll`);
        return response.data;
    }catch(error){
        console.error('Error al obtener las ubicaciones',error)
        return null;
    }
}

export async function getUbicacionByIndex(id:number):Promise<Ubicacion|null>{
    try{
        const response = await axios.get(`${Base_url}/getId`,{
            params : { id }, 
        })
        return response.data;
    }catch(error){
        console.error(`Error al obtener la ubicacion con el id ${id}`,error)
        return null;
    }   
}

export async function postUbicacion(ubicacion:Ubicacion):Promise<Ubicacion>{
        const response = await axios.post(`${Base_url}`,ubicacion);
        return response.data;
}

export async function deleteUbicacion(id:number):Promise<Ubicacion>{
    const response = await axios.delete(`${Base_url}`,{
        params : {id}
    });
    return response.data;
}