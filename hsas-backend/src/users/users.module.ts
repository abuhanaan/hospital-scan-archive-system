import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    PrismaModule,
    // breaking circular dependency with DoctorsModule
    forwardRef(() => DoctorsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
