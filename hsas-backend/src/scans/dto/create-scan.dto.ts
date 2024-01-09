import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  isNumber,
} from 'class-validator';

export class CreateScanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  symptoms: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: File;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  url: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty()
  doctorId: number;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty()
  patientId: number;
}
