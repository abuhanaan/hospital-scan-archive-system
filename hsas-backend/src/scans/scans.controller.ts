import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  UseInterceptors,
  ValidationPipe,
  UploadedFile,
  ParseFilePipe,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ScansService } from './scans.service';
import { CreateScanDto } from './dto/create-scan.dto';
import { UpdateScanDto } from './dto/update-scan.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ScanEntity } from './entities/scan.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/utils/interfaces/authRequest.interface';
import { UserEntity } from 'src/users/entities/user.entity';
import { AdminJwtAuthGuard } from 'src/auth/guards/admin-auth.guards';

@Controller('scans')
@ApiTags('scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ type: ScanEntity })
  async create(
    @Req() request: AuthenticatedRequest,
    @Body() createScanDto: CreateScanDto,
    @UploadedFile(new ParseFilePipe({ validators: [] }))
    file: Express.Multer.File,
  ) {
    const user = request.user as UserEntity;
    if (user.role === 'doctor' && createScanDto.doctorId !== user.id) {
      throw new UnauthorizedException({
        message: `You can only upload scans that you prescribe`,
        error: 'Unauthorised operation',
      });
    }
    const scan = await this.scansService.create(
      createScanDto,
      file.originalname,
      file.buffer,
    );
    return new ScanEntity(scan);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ScanEntity, isArray: true })
  async findAll() {
    const scans = await this.scansService.findAll();
    return scans.map((scan) => new ScanEntity(scan));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ScanEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const scan = await this.scansService.findOne(id);
    return new ScanEntity(scan);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ScanEntity })
  async update(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScanDto: UpdateScanDto,
  ) {
    const user = request.user as UserEntity;
    if (
      updateScanDto.doctorId &&
      user.role === 'doctor' &&
      updateScanDto.doctorId !== user.id
    ) {
      throw new UnauthorizedException({
        message: `You can only update scans that you prescribe`,
        error: 'Unauthorised operation',
      });
    }
    const scan = await this.scansService.update(id, updateScanDto);
    return new ScanEntity(scan);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ScanEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const scan = await this.scansService.remove(id);
    return new ScanEntity(scan);
  }
}
