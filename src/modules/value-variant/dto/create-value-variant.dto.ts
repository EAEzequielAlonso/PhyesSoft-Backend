import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateValueVariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  variantId: string;
}
