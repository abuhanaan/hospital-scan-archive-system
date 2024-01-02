import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

export const jwt_secret = process.env.JWT_SECRET;
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwt_secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
