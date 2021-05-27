import { Body, Controller, Delete, Get, Param, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/exists/:login')
  async userExists(@Param('login') login: string): Promise<{ exists: Boolean, lastSignIn?: Date }> {
    const user = await this.userService.findByLogin(login);

    if (!user) return { exists: false };

    return {
      exists: true,
      lastSignIn: user.lastSignIn,
    };
  }

  @Get('/:id?')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async login(@Res() res: Response, @Param('id') id: string): Promise<any> {
    try {
      if (id) {
        const user = await this.userService.findById(+id);

        res.json({ user: user.toAuthJSON() });
      } else {
        const users = await this.userService.findAll();

        res.json(users.map((user) => user.toAuthJSON()));
      }
    } catch (e) {
      return e;
    }
  }

  @Put('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async update(@Res() res: Response, @Body() userDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.userService.update(userDto);

      res.json({ user: user.toAuthJSON() });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async delete(@Res() res: Response, @Param('id') id: number): Promise<any> {
    try {
      await this.userService.delete(id);

      res.status(200).end();
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
