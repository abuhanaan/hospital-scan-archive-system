import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Patient } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  private checkIfPatientExists(patient: Patient, id: number) {
    if (!patient) {
      throw new NotFoundException({
        message: `Patient with id ${id} does not exist`,
        error: 'Not Found',
      });
    }
  }

  async create(createPatientDto: CreatePatientDto) {
    const existingPatient = await this.prisma.patient.findFirst({
      where: { phoneNumber: createPatientDto.phoneNumber },
    });

    if (existingPatient) {
      throw new ConflictException({
        message: `Patient with contact ${createPatientDto.phoneNumber} already exist`,
        error: 'Conflict Operation',
      });
    }

    return this.prisma.patient.create({ data: createPatientDto });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    this.checkIfPatientExists(patient, id);

    return patient;
  }

  async fetchPatientWithScans(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { scans: true },
    });
    this.checkIfPatientExists(patient, id);

    return patient;
  }

  async fetchPatientWithDoctors(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        scans: {
          include: {
            doctor: true,
          },
        },
      },
    });
    this.checkIfPatientExists(patient, id);

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    this.checkIfPatientExists(patient, id);
    return this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
  }

  async remove(id: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    this.checkIfPatientExists(patient, id);

    return this.prisma.patient.delete({ where: { id } });
  }
}
