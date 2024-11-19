export enum MetodoPago {
    Tarjeta = "tarjeta",
    Paypal = "paypal",
    Transferencia = "transferencia"
}


export interface Pago {
    reserva_id: number;
    monto: number;
    metodo_pago: MetodoPago;  
    fecha_pago: Date;
}