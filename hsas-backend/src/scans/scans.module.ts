import { Module } from '@nestjs/common';
import { ScansService } from './scans.service';
import { ScansController } from './scans.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ScansController],
  providers: [ScansService],
  imports: [PrismaModule, ConfigModule],
})
export class ScansModule {}
