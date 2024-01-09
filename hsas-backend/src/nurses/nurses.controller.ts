import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { NursesService } from './nurses.service';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NurseEntity } from './entities/nurse.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { AuthenticatedRequest } from 'src/utils/interfaces/authRequest.interface';
import { UserEntity } from 'src/users/entities/user.entity';
import { AdminJwtAuthGuard } from 'src/auth/guards/admin-auth.guards';

@Controller('nurses')
@ApiTags('nurses')
export class NursesController {
  constructor(private readonly nursesService: NursesService) {}

  @Post()
  @ApiCreatedResponse({ type: NurseEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createNurseDto: CreateNurseDto) {
    const nurse = await this.nursesService.create(createNurseDto);
    return new NurseEntity(nurse);
  }

  @Get()
  @ApiOkResponse({ type: NurseEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    const nurses = await this.nursesService.findAll();
    return nurses.map((nurse) => new NurseEntity(nurse));
  }

  @Get(':id')
  @ApiOkResponse({ type: DoctorEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.nursesService.findOne(+id);
  }

  @Patch('/update-profile/:id')
  @ApiOkResponse({ type: NurseEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
    @Body() updateNurseDto: UpdateNurseDto,
  ) {
    const user = request.user as UserEntity;
    const nurse = await this.nursesService.update(id, updateNurseDto, user);
    return new NurseEntity(nurse);
  }

  @Delete(':id')
  @ApiOkResponse({ type: NurseEntity })
  @UseGuards(AdminJwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    const nurse = await this.nursesService.remove(id);
    return new NurseEntity(nurse);
  }
}
