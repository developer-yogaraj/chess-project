import { LoginDTO, RegisterDTO, UserProfileDTO} from './dto/auth.dto';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dbConstants } from 'src/constant';
import { IsNull, Repository } from 'typeorm';
import { PlayersAndArbiters } from 'src/entity';
import { compare, hash } from 'bcryptjs';
import { Exceptions } from "src/constant";
import { Multer } from 'multer';
import { AwsS3Service} from 'src/aws/aws-s3.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PlayersAndArbiters, dbConstants.DATA_SOURCE_NAME)
    private readonly authRepo: Repository<PlayersAndArbiters>,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async registerUser(
    RegisterDTO: RegisterDTO,
    photo: Multer.File,
  ) {
    try {
      let authUser = new PlayersAndArbiters();
  
      if (RegisterDTO.playerArbiterId) {
        authUser = (await this.authRepo.findOne({
          where: { playerArbiterId: RegisterDTO.playerArbiterId },
        })) ?? new PlayersAndArbiters();
      }

      const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (!allowedMimes.includes(photo.mimetype)) {
        throw new Error('Only JPG, JPEG, PNG images are allowed');
      }

      const maxFileSize = 3 * 1024 * 1024; // 3MB
      if (photo.size > maxFileSize) {
        throw new Error('Image size must be less than 3MB');
      }

      let photoUrl: string | undefined = undefined;
      if (photo) {
        photoUrl = await this.awsS3Service.uploadFile(photo, 'players-photos');
      }
  
      authUser = {
        ...authUser,
        ...{
          firstName: RegisterDTO.firstName,
          lastName: RegisterDTO.lastName,
          email: RegisterDTO.email,
          phone: RegisterDTO.phone,
          parentName: RegisterDTO.parentName,
          relationShip: RegisterDTO.relationShip,
          state: RegisterDTO.state, 
          city: RegisterDTO.city,
          address: RegisterDTO.address,
          aicfId: RegisterDTO.aicfId,
          tnscaId: RegisterDTO.tnscaId,
          fideId: RegisterDTO.fideId,
          type: RegisterDTO.type,
          dateOfBrith: RegisterDTO.dateOfBrith,
          gender: RegisterDTO.gender,
          pincode: RegisterDTO.pincode,
          motherTounge: RegisterDTO.motherTounge,
          password: RegisterDTO.password
            ? await hash(
                RegisterDTO.password,
                parseInt(process.env.PWD_SALT_ROUNDS || '10', 10),
              )
            : authUser.password,
            photo: photoUrl ?? authUser.photo, 
        },
      };
  
      authUser = await this.authRepo.save(authUser);
      return {
        message: Exceptions.REGISTER_SUCCESSFULLY,
      };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async login(userDTO: LoginDTO) {
    try {
      const authUser = await this.authRepo.findOne({
        where: {email: userDTO.email},
         });
      if (!authUser) {
          throw new NotFoundException('invalid email or password');
      }
      const isPasswordValid = await compare(userDTO.password, authUser.password);
      if (!isPasswordValid) {
        throw new NotFoundException('invalid email or password');
      }
      return { userEmail: authUser.email};
    } catch (error) {
      console.error('Login error:', error);
      throw new HttpException(
        {
          success: false,
          message: Exceptions.INVALID_EMAIL_OR_PASSWORD,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }


  async getUserProfileDetails(email: string) {
    try {
      const player = await this.authRepo.findOne({
        where: { email },
      });
  
      if (!player) {
        throw new Error('User not found');
      }

      let photoUrl: string | null = null;
      
      if (player.photo) {
        photoUrl = await this.awsS3Service.getSignedUrl(player.photo); 
      }
      return {
        ...player,
        photoUrl: photoUrl, 
      };
    } catch (error) {
      console.log('Error fetching profile details:', error);
      throw error;
    }
  }

  async searchPlayers(search: string) {
    const query = this.authRepo.createQueryBuilder('player')
      .select([
        'player.playerArbiterId',
        'player.type',
        'player.firstName',
        'player.lastName',
        'player.city', 
        'player.gender',
        'player.isActive',
      ]);

    if (search) {
      query.where('player.firstName ILIKE :search', { search: `%${search}%` })
        .orWhere('player.lastName ILIKE :search', { search: `%${search}%` })
        .orWhere('player.email ILIKE :search', { search: `%${search}%` });
    }
    const players = await query.getMany();
    return players;
  }
}
