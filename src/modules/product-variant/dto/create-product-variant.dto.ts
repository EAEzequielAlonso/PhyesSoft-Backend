import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductVariantDto {

      @IsString()
      @IsNotEmpty()
      name: string;
}
