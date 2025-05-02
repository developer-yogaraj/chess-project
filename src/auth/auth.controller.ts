import { Body, Controller, Post, Get, Put, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  LoginDTO,
  RegisterDTO,
  UserProfileDTO,
} from './dto/auth.dto';


@ApiTags('PlayerAndArbiter')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

  @Post('/register')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  async register(
    @UploadedFile() photo: Multer.File,
    @Body() RegisterDTO: RegisterDTO,
  ) {
    return await this.authService.registerUser(
      RegisterDTO,
      photo,
    );
  }

  @Get('/user-profile-details')
  async getUserProfileDetails(@Query('email') email: string) {
    return this.authService.getUserProfileDetails(email);
  }

  @ApiQuery({ name: 'search', required: false, description: 'Search by first name, last name, or email' })
  @Get('/search-players')
  async searchPlayers(@Query('search') search: string) {
    return this.authService.searchPlayers(search);
  }
}
