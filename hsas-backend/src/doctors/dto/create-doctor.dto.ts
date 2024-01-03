import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  speciality?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
