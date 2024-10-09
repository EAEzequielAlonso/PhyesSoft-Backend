import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class SaleProductDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    productId:string

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

export class CreateSaleDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    numSale:number

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    subtotal: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    discount: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    total: number

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    branchId: string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    clientId: string

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    products: SaleProductDto[];
}
