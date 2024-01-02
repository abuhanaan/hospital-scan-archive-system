import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException({
          message: 'Conflict Operation',
          error: `User with email ${createUserDto.email} already exist`,
        });
      }
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        roundsOfHashing,
      );

      createUserDto.password = hashedPassword;
      return this.prisma.user.create({ data: createUserDto });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException({
        message: 'Not Found',
        error: `User with id ${id} does not exist`,
      });
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException({
        message: 'Not Found',
        error: `User with id ${id} does not exist`,
      });
    }
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
      updateUserDto.password = hashedPassword;
    }

    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException({
        message: 'Not Found',
        error: `User with id ${id} does not exist`,
      });
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
