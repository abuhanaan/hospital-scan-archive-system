import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nextOfKinName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nextOfKinPhone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nextOfKinRelationship: string;
}
