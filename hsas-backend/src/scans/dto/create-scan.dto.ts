import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, format: 'int' })
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  patientId: number;
}
