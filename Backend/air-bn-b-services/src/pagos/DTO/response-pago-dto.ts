import { IsDate, IsDecimal, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { pagos_metodo_pago } from "@prisma/client"; // Importa la enumeración de Prisma
import { Decimal } from "@prisma/client/runtime/library";

export class ResponsetePagoDto {
    @IsInt()
    reserva_id: number;

    @IsDecimal()
    monto: Decimal;

    @IsEnum(pagos_metodo_pago) 
    metodo_pago: pagos_metodo_pago;

    @IsOptional()
    @IsDate()
    fecha_pago?: Date;
}