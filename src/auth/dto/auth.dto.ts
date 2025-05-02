import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, IsISO8601, IsOptional, IsEnum } from 'class-validator';
import { UserType } from 'src/constant';
import { Multer } from 'multer';

export class LoginDTO {
  @AutoMap()
  @ApiProperty({ required: true })
  email: string;

  @AutoMap()
  @ApiProperty({ required: true })
  password: string;
}

export class RegisterDTO {
  @AutoMap()
  @ApiProperty({ required: false })
  playerArbiterId?: string;

  @AutoMap()
  @ApiProperty({ required: true })
  firstName: string;

  @AutoMap()
  @ApiProperty({ required: true })
  lastName: string;

  @IsStrongPassword({}, { message: 'Password must contain atleast one character and one number' })
  @AutoMap()
  @ApiProperty({ required: true })
  password: string;

  @IsEmail({}, { message: 'Invalid email format. Please provide a valid email address.' })
  @AutoMap()
  @ApiProperty({ required: true })
  email: string;

  @AutoMap()
  @ApiProperty({ required: true })
  phone?: string;

  @AutoMap()
  @ApiProperty({ required: true })
  parentName?: string;

  @AutoMap()
  @ApiProperty({ required: true })
  relationShip?: string;

  @AutoMap()
  @ApiProperty({ required: true })
  gender: string;

  @AutoMap()
  @ApiProperty({ required: true, type: String, format: 'date-time' })
  dateOfBrith: Date;

  @AutoMap()
  @ApiProperty({ required: true })
  address: string;

  @AutoMap()
  @ApiProperty({ required: true })
  city: string;

  @AutoMap()
  @ApiProperty({ required: true })
  state: string;

  @AutoMap()
  @ApiProperty({ required: true })
  pincode: string;

  @AutoMap()
  @ApiProperty({ required: true })
  motherTounge: string;

  @AutoMap()
  @ApiProperty({ required: false })
  fideId?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  aicfId?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  tnscaId?: string;

  @AutoMap()
  @ApiProperty({
    required: true,
    enum: UserType,
  })
  @IsEnum(UserType, { message: 'Type must be either player or Arbiter' })
  type: UserType;


  @AutoMap()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  photo: Multer.File;

  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // @AutoMap()
  // certificate: Multer.File;
}

export class UserProfileDTO {
  @AutoMap()
  @ApiProperty({ required: true })
  email: string;
}