import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AdminJwtStrategy } from './strategies/admin-auth.strategy';

export const jwt_secret = process.env.JWT_SECRET;
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AdminJwtStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwt_secret,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
})
export class AuthModule {}
