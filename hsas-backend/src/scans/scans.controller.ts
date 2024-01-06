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
} from '@nestjs/common';
import { ScansService } from './scans.service';
import { CreateScanDto } from './dto/create-scan.dto';
import { UpdateScanDto } from './dto/update-scan.dto';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ScanEntity } from './entities/scan.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('scans')
@ApiTags('scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ type: ScanEntity })
  async create(
    @Body() createScanDto: CreateScanDto,
    @UploadedFile(new ParseFilePipe({ validators: [] }))
    file: Express.Multer.File,
  ) {
    const scan = await this.scansService.create(
      createScanDto,
      file.originalname,
      file.buffer,
    );
    return new ScanEntity(scan);
  }

  @Get()
  @ApiOkResponse({ type: ScanEntity, isArray: true })
  async findAll() {
    const scans = await this.scansService.findAll();
    return scans.map((scan) => new ScanEntity(scan));
  }

  @Get(':id')
  @ApiOkResponse({ type: ScanEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const scan = await this.scansService.findOne(id);
    return new ScanEntity(scan);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ScanEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScanDto: UpdateScanDto,
  ) {
    const scan = await this.scansService.update(id, updateScanDto);
    return new ScanEntity(scan);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ScanEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const scan = await this.scansService.remove(id);
    return new ScanEntity(scan);
  }
}
