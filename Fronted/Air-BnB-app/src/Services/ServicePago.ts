import type { Pago } from "@/Interfaces/Pago";
import axios from "axios";

const Base_Url = 'http://localhost:3000/pago'

export async function CreatePago(monto:number,id:number,metodo_pago:string ):Promise<Pago>{
    const newPago = {
        reserva_id : id,
        monto : monto,
        metodo_pago : metodo_pago,
        fecha_pago : new Date()
    }
    console.log(newPago)
    const response = await axios.post(`${Base_Url}`,newPago);
    console.log(response)
    return response.data
}