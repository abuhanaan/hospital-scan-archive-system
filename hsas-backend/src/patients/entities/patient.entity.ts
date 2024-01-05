import { ApiProperty } from '@nestjs/swagger';
import { DoctorPatient, Patient, Scan } from '@prisma/client';

export class PatientEntity implements Patient {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  dob: Date;

  @ApiProperty()
  nextOfKinName: string;

  @ApiProperty()
  nextOfKinPhone: string;

  @ApiProperty()
  nextOfKinRelationship: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  scans: Scan[];

  doctors: DoctorPatient[];
}
