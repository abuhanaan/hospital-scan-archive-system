import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { ScansModule } from './scans/scans.module';
import { NursesModule } from './nurses/nurses.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, DoctorsModule, PatientsModule, ScansModule, NursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
