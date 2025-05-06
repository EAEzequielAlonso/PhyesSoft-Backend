import { IsNotEmpty, IsString } from "class-validator";

export class CreateBoxCashDto {
    
    @IsString()
    @IsNotEmpty()
    name: string; // Nombre de la caja
    
    @IsString()
    @IsNotEmpty()
    branchId:string
    
    @IsString()
    @IsNotEmpty()
    salePointId:string;
}
