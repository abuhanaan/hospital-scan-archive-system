import { Module, forwardRef } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule), // breaking circular dependency with UsersModule
  ],
  exports: [DoctorsService],
})
export class DoctorsModule {}
