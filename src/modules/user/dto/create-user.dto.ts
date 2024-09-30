import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  Validate,
} from 'class-validator';
import { passwordCompare } from '../../../decorators/comparePass.decorator';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'El nombre es obligatorio',
    example: 'Carlos',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({
    description: 'El DNI es obligatorio',
    example: '34576894',
  })
  @IsNotEmpty()
  @IsNumber()
  dni: number;

  @ApiPropertyOptional({
    description: 'Debe ser un email válido',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @ApiProperty({
    description:
      'La contraseña debe tener almenos 6 caracteres, una mayuscula, una minuscula y un caracter especial',
    example: 'pruEba123&%',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    description:
      'La confirmacion del password es Obligatoria. Debe coincidir con password.',
    example: 'pruEba123&%',
  })
  @IsNotEmpty()
  @IsString()
  @Validate(passwordCompare, ['password'])
  passwordConfirm: string;

  @ApiProperty({
    description: 'La fecha de inicio es obligatoria',
    example: new Date(),
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
}
