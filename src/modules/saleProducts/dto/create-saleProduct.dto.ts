import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator"

export class CreateSaleProductDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    saleId: string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    productId: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    discount: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    quantity: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    total: number
}
