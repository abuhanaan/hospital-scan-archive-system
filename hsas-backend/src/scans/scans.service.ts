import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScanDto } from './dto/create-scan.dto';
import { UpdateScanDto } from './dto/update-scan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Scan } from '@prisma/client';

@Injectable()
export class ScansService {
  constructor(private prisma: PrismaService) {}

  private async checkIfDoctorExists(doctorId: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException({
        message: `Doctor with id ${doctorId} does not exist`,
        error: 'Not Found',
      });
    }
  }

  private async checkIfPatientExists(patientId: number) {
    const doctor = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });
    if (!doctor) {
      throw new NotFoundException({
        message: `Doctor with id ${patientId} does not exist`,
        error: 'Not Found',
      });
    }
  }

  private checkIfScanExist(id: number, scan: Scan) {
    if (!scan) {
      throw new NotFoundException({
        message: `Scan with id ${id} does not exist`,
        error: `Not Found`,
      });
    }
  }
  async create(createScanDto: CreateScanDto) {
    // TODO: Implement scan upload before record insertion
    await this.checkIfDoctorExists(createScanDto.doctorId);
    await this.checkIfPatientExists(createScanDto.patientId);
    return this.prisma.scan.create({ data: createScanDto });
  }

  findAll() {
    return this.prisma.scan.findMany();
  }

  async findOne(id: number) {
    const scan = await this.prisma.scan.findUnique({
      where: { id },
      include: { doctor: true, patient: true },
    });
    this.checkIfScanExist(id, scan);
    return scan;
  }

  async update(id: number, updateScanDto: UpdateScanDto) {
    if (updateScanDto.doctorId) {
      await this.checkIfDoctorExists(updateScanDto.doctorId);
    }
    const scan = await this.prisma.scan.findUnique({
      where: { id },
    });
    this.checkIfScanExist(id, scan);
    return await this.prisma.scan.update({
      where: { id },
      data: updateScanDto,
      include: { doctor: true, patient: true },
    });
  }

  async remove(id: number) {
    const scan = await this.prisma.scan.findUnique({
      where: { id },
    });
    this.checkIfScanExist(id, scan);
    return await this.prisma.scan.delete({ where: { id } });
  }
}
