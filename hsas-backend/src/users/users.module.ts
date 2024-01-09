import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { NursesModule } from 'src/nurses/nurses.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, DoctorsModule, NursesModule],
  exports: [UsersService],
})
export class UsersModule {}
