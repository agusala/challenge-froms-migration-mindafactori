import { IsString, Length, Matches, IsNumber, Min, Max, Validate } from 'class-validator';
import { validateDominio, validateCUIT, validateFechaFabricacion } from '../../../common/validators';

export class CreateAutomotorDto {
  @IsString()
  @Length(6, 8) // puede ser 6 o 7? AAA999 (6) o AA999AA (7)
  @Matches(/^[A-Z]{3}[0-9]{3}$|^[A-Z]{2}[0-9]{3}[A-Z]{2}$/, { message: 'Dominio inválido' })
  dominio: string;
  @IsString()
  @Length(0, 25)
  numero_chasis?: string;
  @IsString()
  @Length(0, 25)
  numero_motor?: string;
  @IsString()
  @Length(0, 40)
  color?: string;
  @IsNumber()
  @Min(190001)
  @Max(299912)
  fecha_fabricacion: number;
  @IsString()
  @Length(11, 11)
  @Matches(/^\d+$/, { message: 'CUIT debe ser numérico' })
  cuit_duenio: string;
}