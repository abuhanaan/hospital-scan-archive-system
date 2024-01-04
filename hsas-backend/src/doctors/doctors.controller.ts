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
import { UserEntity } from 'src/users/entities/user.entity';
import { AdminJwtAuthGuard } from 'src/auth/guards/admin-auth.guards';

@Controller('doctors')
@ApiTags('doctor')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiCreatedResponse({ type: DoctorEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorsService.create(createDoctorDto);
    return new DoctorEntity(doctor);
  }

  @Get()
  @ApiOkResponse({ type: DoctorEntity, isArray: true })
  @UseGuards(JwtAuthGuard, JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    const doctors = await this.doctorsService.findAll();
    return doctors.map((doctor) => new DoctorEntity(doctor));
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
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    const doctor = await this.doctorsService.update(id, updateDoctorDto);
    return new DoctorEntity(doctor);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DoctorEntity })
  @UseGuards(JwtAuthGuard, AdminJwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    const doctor = await this.doctorsService.remove(id);
    return new DoctorEntity(doctor);
  }
}
