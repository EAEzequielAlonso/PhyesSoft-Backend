import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProductDto {
    
    @IsString() @IsNotEmpty() @ApiProperty()
    description:string;

    @IsNumber() @IsNotEmpty() @ApiProperty()
    cost:number;

    @IsNumber() @IsNotEmpty() @ApiProperty()
    profit:number;

    @IsNumber() @IsNotEmpty() @ApiProperty()
    price:number;

    @IsDateString() @IsNotEmpty() @ApiProperty()
    startDate:Date;

    // @IsUUID() @IsNotEmpty() @ApiProperty()
    // subcategoryId:string;

    // @IsUUID() @IsNotEmpty() @ApiProperty()
    // modelId:string;
}
