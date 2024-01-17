import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Doctor } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

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

  async dashboard(user: UserEntity) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: user.id },
    });
    this.checkIfDoctorExists(doctor, user.id);

    // ## TODO: Work around getting the real patient count using distinct patients from the count below
    const patientCount = await this.prisma.scan.count({
      where: { doctorId: user.id },
    });
    const scanCount = await this.prisma.scan.count({
      where: { doctorId: doctor.doctorId },
    });
    const recentScans = await this.prisma.scan.findMany({
      where: { doctorId: user.id },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });

    return { patientCount, scanCount, recentScans };
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

  async update(id: number, updateDoctorDto: UpdateDoctorDto, user: UserEntity) {
    if (id !== user.id) {
      throw new UnauthorizedException({
        message: "You are not Authorised to update someonele's profile",
        error: 'Unauthorised',
      });
    }
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: id },
      include: { user: true },
    });
    this.checkIfDoctorExists(doctor, id);
    return this.prisma.doctor.update({
      where: { doctorId: id },
      data: updateDoctorDto,
      include: { user: true },
    });
  }

  async remove(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: id },
    });
    this.checkIfDoctorExists(doctor, id);
    return this.prisma.doctor.delete({ where: { doctorId: id } });
  }

  async fetchPersonalizedPatients(user: UserEntity) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: user.id },
    });
    this.checkIfDoctorExists(doctor, user.id);
    const patients = await this.prisma.scan
      .findMany({
        where: { doctorId: doctor.doctorId },
        select: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              gender: true,
              phoneNumber: true,
              address: true,
              dob: true,
              nextOfKinName: true,
              nextOfKinPhone: true,
              nextOfKinRelationship: true,
            },
          },
        },
        distinct: ['patientId'], // Ensure distinct patients based on patientId
      })
      .then((scans) => scans.map((scan) => scan.patient));
    return patients;
  }

  async fetchPersonalizedScans(user: UserEntity) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { doctorId: user.id },
    });
    this.checkIfDoctorExists(doctor, user.id);
    const scans = await this.prisma.scan.findMany({
      where: { doctorId: doctor.doctorId },
      include: { patient: true },
    });
    return scans;
  }
}
