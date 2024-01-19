import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DoctorEntity } from './entities/doctor.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminJwtAuthGuard } from 'src/auth/guards/admin-auth.guards';
import { AuthenticatedRequest } from 'src/utils/interfaces/authRequest.interface';
import { UserEntity } from 'src/users/entities/user.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { ScanEntity } from 'src/scans/entities/scan.entity';

@Controller('doctors')
@ApiTags('doctor')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiCreatedResponse({ type: DoctorEntity })
  @UseGuards(AdminJwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorsService.create(createDoctorDto);
    return new DoctorEntity(doctor);
  }

  @Get('patients')
  @ApiOkResponse({ type: PatientEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async fetchPersonalizedPatients(@Req() request: AuthenticatedRequest) {
    console.log('Reached the beginning of the method.');
    const user = request.user as UserEntity;
    const patients = await this.doctorsService.fetchPersonalizedPatients(user);
    return patients.map((patient) => new PatientEntity(patient));
  }

  @Get('scans')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ScanEntity, isArray: true })
  async fetchPersonalizedScans(@Req() request: AuthenticatedRequest) {
    const user = request.user as UserEntity;
    console.log(user);
    const scans = await this.doctorsService.fetchPersonalizedScans(user);
    return scans.map((scan) => new ScanEntity(scan));
  }
  @Get()
  @ApiOkResponse({ type: DoctorEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    const doctors = await this.doctorsService.findAll();
    return doctors.map((doctor) => new DoctorEntity(doctor));
  }

  @Get('/dashboard')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Object })
  async dashboard(@Req() request: AuthenticatedRequest) {
    const user = request.user as UserEntity;
    const result = await this.doctorsService.dashboard(user);
    return new Object(result);
  }

  @Get(':id')
  @ApiOkResponse({ type: DoctorEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const doctor = await this.doctorsService.findOne(id);
    return new DoctorEntity(doctor);
  }

  @Patch('/update-profile/:id')
  @ApiOkResponse({ type: DoctorEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    const user = request.user as UserEntity;
    const doctor = await this.doctorsService.update(id, updateDoctorDto, user);
    return new DoctorEntity(doctor);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DoctorEntity })
  @UseGuards(AdminJwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    const doctor = await this.doctorsService.remove(id);
    return new DoctorEntity(doctor);
  }
}
