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
import { ScansService } from './scans.service';
import { CreateScanDto } from './dto/create-scan.dto';
import { UpdateScanDto } from './dto/update-scan.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScanEntity } from './entities/scan.entity';

@Controller('scans')
@ApiTags('scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Post()
  @ApiCreatedResponse({ type: ScanEntity })
  async create(@Body() createScanDto: CreateScanDto) {
    const scan = await this.scansService.create(createScanDto);
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
