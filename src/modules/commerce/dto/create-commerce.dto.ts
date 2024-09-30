import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommerceDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nameFantacy: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nameCompany: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    slogan: string;
  
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    emailCompany: string;
  
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    InitDate: Date;
  
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    startDate: Date;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

}
