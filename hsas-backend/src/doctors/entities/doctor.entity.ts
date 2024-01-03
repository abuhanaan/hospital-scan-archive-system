import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

export class DoctorEntity implements Doctor {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  speciality: string;

  @ApiProperty()
  userId: number | null;

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;

  constructor({ user, ...data }: Partial<DoctorEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false, nullable: true })
  updatedAt: Date;
}
