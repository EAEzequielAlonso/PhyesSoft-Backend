import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCashMovementDto {
    
    @IsNumber()
    @IsNotEmpty()
    @Type (() => Number)
    amount: number;

    @IsUUID()
    @IsNotEmpty()
    dailyCashId: string

    @IsUUID()
    @IsNotEmpty()
    movementTypeId: string

    @IsString()
    @IsOptional()
    description: string;
}
