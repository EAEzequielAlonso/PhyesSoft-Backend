import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateIvaDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    alicuota: number
}
