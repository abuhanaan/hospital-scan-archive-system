import { ApiProperty } from '@nestjs/swagger';
import { Scan } from '@prisma/client';
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  patientId: number;
}
