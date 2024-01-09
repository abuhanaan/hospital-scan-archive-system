import { Module } from '@nestjs/common';
import { NursesService } from './nurses.service';
import { NursesController } from './nurses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NursesController],
  providers: [NursesService],
  imports: [PrismaModule],
  exports: [NursesService],
})
export class NursesModule {}
