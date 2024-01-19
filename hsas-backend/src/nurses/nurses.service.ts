import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Nurse } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class NursesService {
  constructor(private prisma: PrismaService) {}

  private checkIfNurseExists(nurse: Nurse, id: number) {
    if (!nurse) {
      throw new NotFoundException({
        message: `User with id ${id} does not have a Nurse Profile`,
        error: 'Not Found',
      });
    }
  }
  async create(createNurseDto: CreateNurseDto) {
    const existingProfile = await this.prisma.nurse.findUnique({
      where: { nurseId: createNurseDto.nurseId },
    });

    if (existingProfile) {
      throw new ConflictException({
        message: `Nurse with nurseId ${createNurseDto.nurseId} already have a doctor profile`,
        error: 'Conflict Operation',
      });
    }
    return this.prisma.nurse.create({ data: createNurseDto });
  }

  async findAll() {
    const nurses = await this.prisma.nurse.findMany({
      include: { user: true },
    });
    return nurses;
  }

  async findOne(id: number) {
    const nurse = await this.prisma.nurse.findUnique({
      where: { nurseId: id },
      include: { user: true },
    });
    this.checkIfNurseExists(nurse, id);
    return nurse;
  }

  async update(id: number, updateNurseDto: UpdateNurseDto, user: UserEntity) {
    if (id !== user.id) {
      throw new UnauthorizedException({
        message: "You are not Authorised to update someone else's profile",
        error: 'Unauthorised',
      });
    }
    const nurse = await this.prisma.nurse.findUnique({
      where: { nurseId: id },
      include: { user: true },
    });
    this.checkIfNurseExists(nurse, id);
    return this.prisma.nurse.update({
      where: { nurseId: id },
      data: updateNurseDto,
      include: { user: true },
    });
  }

  async remove(id: number) {
    const nurse = await this.prisma.nurse.findUnique({
      where: { nurseId: id },
    });
    this.checkIfNurseExists(nurse, id);
    return this.prisma.nurse.delete({ where: { nurseId: id } });
  }
}
