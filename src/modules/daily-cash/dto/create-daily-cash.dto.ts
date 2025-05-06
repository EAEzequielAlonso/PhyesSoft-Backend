import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDailyCashDto {
    
    @IsNumber()
    @IsNotEmpty()  
    initCash: number;
    
    @IsNumber()
    @IsOptional()
    cash: number; // Efectivo

    @IsNumber()
    @IsOptional()
    transfer: number; // Transferencias

    @IsNumber()
    @IsOptional()
    card: number; // Pagos con tarjeta

    @IsNumber()
    @IsOptional()
    discount: number; // Monto total de descuentos aplicados

    @IsNumber()
    @IsOptional()
    expenses: number; // Monto total de gastos

    @IsNumber()
    @IsOptional()
    cashCount: number; // Cantidad de ventas en efectivo

    @IsNumber()
    @IsOptional()
    transferCount: number; // Cantidad de ventas por transferencia

    @IsNumber()
    @IsOptional()
    cardCount: number; // Cantidad de ventas con tarjeta

    @IsNumber()
    @IsOptional()
    expensesCount: number; // Número de transacciones de gastos

    @IsNumber()
    @IsOptional()
    discountCount: number; // Número de ventas con descuento
    
    @IsString()
    @IsNotEmpty()
    boxCashId:string;
}
