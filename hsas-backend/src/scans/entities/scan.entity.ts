import { ApiProperty } from '@nestjs/swagger';
import { Scan } from '@prisma/client';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';

export class ScanEntity implements Scan {
  @ApiProperty()
  id: number;

  @ApiProperty()
  symptoms: string;

  @ApiProperty()
  diagnosis: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  doctorId: number;

  @ApiProperty({ required: false, type: DoctorEntity })
  doctor?: DoctorEntity;

  @ApiProperty()
  patientId: number;

  @ApiProperty({ required: false, type: PatientEntity })
  patient?: PatientEntity;

  constructor(data: Partial<ScanEntity>) {
    Object.assign(this, data);
  }
}
