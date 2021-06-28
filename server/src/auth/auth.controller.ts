import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResetPasswordDto, SignInUserDto } from './auth.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: Request & { user: { id: number } }) {
    try {
      return await this.authService.getUserById(req.user.id);
    } catch (e) {
      return e;
    }
  }

  @Post('signIn')
  async login(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
    try {
      const user = await this.authService.signIn(signInUserDto);

      res.status(200).json(user);
    } catch(e) {
      res.status(e.status).json(e);
    }
  }

  @Post('createUser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.createUser(createUserDto);
    } catch(e) {
      if (e.errors) {
        return {
          status: 400,
          message: e.errors.map((error) => error.message),
        };
      }

      return e;
    }
  }

  @Get('requestResetPassword/:login')
  async requestResetPassword(@Param('login') login: string, @Query('email') email: string) {
    try {
      return await this.authService.requestResetPassword(login, email);
    } catch(e) {
      return e;
    }
  }

  @Post('resetPassword/:key')
  async resetPassword(@Param('key') key: string, @Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return await this.authService.resetPassword(key, resetPasswordDto.password);
    } catch(e) {
      return e;
    }
  }
}
