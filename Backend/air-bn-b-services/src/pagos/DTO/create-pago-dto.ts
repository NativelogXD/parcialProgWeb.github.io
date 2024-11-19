import { IsDate, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { pagos_metodo_pago } from "@prisma/client"; // Importa la enumeración de Prisma
import { Decimal } from "@prisma/client/runtime/library";

export class CreatePagoDto {
    @IsInt()
    @IsNotEmpty()
    reserva_id: number;

    @IsDecimal()
    @IsNotEmpty()
    monto: Decimal;

    @IsEnum(pagos_metodo_pago) 
    @IsNotEmpty()
    metodo_pago: pagos_metodo_pago;

    @IsOptional()
    @IsDate()
    fecha_pago?: Date;
}