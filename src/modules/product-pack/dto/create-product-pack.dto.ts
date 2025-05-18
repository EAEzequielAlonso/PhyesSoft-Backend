import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateProductPackDto {
   
   @IsUUID()
   @IsNotEmpty()
   productpackId:string;

   @IsUUID()
   @IsNotEmpty()
   productcompId:string;

   @IsNumber()
   @IsNotEmpty()
   quantity: number;

}
