import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DoctorEntity } from './entities/doctor.entity';

@Controller('doctors')
@ApiTags('doctor')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiCreatedResponse({ type: DoctorEntity })
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorsService.create(createDoctorDto);
    return new DoctorEntity(doctor);
  }

  @Get()
  @ApiOkResponse({ type: DoctorEntity, isArray: true })
  async findAll() {
    const doctors = await this.doctorsService.findAll();
    return doctors.map((doctor) => new DoctorEntity(doctor));
  }

  @Get(':id')
  @ApiOkResponse({ type: DoctorEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const doctor = await this.doctorsService.findOne(id);
    return new DoctorEntity(doctor);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DoctorEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    const doctor = await this.doctorsService.update(id, updateDoctorDto);
    return new DoctorEntity(doctor);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DoctorEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const doctor = await this.doctorsService.remove(id);
    return new DoctorEntity(doctor);
  }
}
