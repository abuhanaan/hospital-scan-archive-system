import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Doctor } from '@prisma/client';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  private checkIfDoctorExists(doctor: Doctor, id: number) {
    if (!doctor) {
      throw new NotFoundException({
        message: `User with id ${id} does not have a Doctor Profile`,
        error: 'Not Found',
      });
    }
  }
  async create(createDoctorDto: CreateDoctorDto) {
    const existingProfile = await this.prisma.doctor.findUnique({
      where: { doctorId: createDoctorDto.doctorId },
    });

    if (existingProfile) {
      throw new ConflictException({
        message: `Doctor with doctorId ${createDoctorDto.doctorId} already have a doctor profile`,
        error: 'Conflict Operation',
      });
    }
    return this.prisma.doctor.create({ data: createDoctorDto });
  }

  async findAll() {
    const doctors = await this.prisma.doctor.findMany({
      include: { user: true },
    });
    return doctors;
  }

  async findOne(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: id },
      include: { user: true },
    });
    this.checkIfDoctorExists(doctor, id);
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: id },
      include: { user: true },
    });
    this.checkIfDoctorExists(doctor, id);
    return this.prisma.doctor.update({
      where: { id },
      data: updateDoctorDto,
      include: { user: true },
    });
  }

  async remove(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: id },
      include: { user: true },
    });
    this.checkIfDoctorExists(doctor, id);
    return this.prisma.doctor.delete({ where: { doctorId: id } });
  }
}
