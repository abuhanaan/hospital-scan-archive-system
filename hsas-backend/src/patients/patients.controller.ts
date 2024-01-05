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
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PatientEntity } from './entities/patient.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminJwtAuthGuard } from 'src/auth/guards/admin-auth.guards';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PatientEntity })
  async create(@Body() createPatientDto: CreatePatientDto) {
    const patient = await this.patientsService.create(createPatientDto);
    return new PatientEntity(patient);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PatientEntity, isArray: true })
  async findAll() {
    const patients = await this.patientsService.findAll();
    return patients.map((patient) => new PatientEntity(patient));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PatientEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientsService.findOne(id);
    return new PatientEntity(patient);
  }

  @Get('/scans/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PatientEntity })
  async fetchPatientWithScans(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientsService.fetchPatientWithScans(id);
    return new PatientEntity(patient);
  }

  @Get('/doctors/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PatientEntity })
  async fetchPatientWithDoctors(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientsService.fetchPatientWithDoctors(id);
    return new PatientEntity(patient);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PatientEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const patient = await this.patientsService.update(id, updatePatientDto);
    return new PatientEntity(patient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminJwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const patient = await this.patientsService.remove(+id);
    return new PatientEntity(patient);
  }
}
