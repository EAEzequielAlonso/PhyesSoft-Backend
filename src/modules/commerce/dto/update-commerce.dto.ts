
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommerceDto {

      @IsString()
      @IsOptional()
      @ApiProperty()
      nameFantasy: string;
    
      @IsString()
      @IsOptional()
      @ApiProperty()
      nameCompany: string;
    
      @IsEmail()
      @IsOptional()
      @ApiProperty()
      emailCompany: string;
    
      @IsString()
      @IsOptional()
      @ApiProperty()
      slogan: string;
    
      @IsString()
      @IsOptional()
      @ApiProperty()
      imgLogo: string;
    
      @IsDateString()
      @IsOptional()
      @ApiProperty()
      InitDate: Date;
    
      @IsDateString()
      @IsOptional()
      @ApiProperty()
      endDate: Date;
}
