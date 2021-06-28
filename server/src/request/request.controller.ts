import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { RequestService } from './request.service';
import { CreateRequestDto, UpdateRequestStatusDto } from './request.dto';
import { Query } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async login(@Res() res: Response, @Query() query): Promise<any> {
    try {
      const { offset, limit } = query;
      const { requests, total } = await this.requestService.findAll({ offset, limit });

      res.json({ requests, total });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Get('/forCurrentUser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async forCurrentUser(@Res() res: Response, @Req() req: Request & { user: { id: number } }): Promise<any> {
    try {
      const { name, lastName, surname } = await this.userService.findById(req.user.id);
      const request = await this.requestService.findByFullName(`${lastName} ${name} ${surname}`);

      res.json({ request });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat, Role.Student)
  async create(@Res() res: Response, @Body() roomDto: CreateRequestDto): Promise<any> {
    try {
      const request = await this.requestService.create(roomDto);

      res.json({ request });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Put('updateStatus/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async updateStatus(@Res() res: Response, @Body() roomDto: UpdateRequestStatusDto, @Param('id') id: number): Promise<any> {
    try {
      const request = await this.requestService.updateStatus(id, roomDto);

      res.json({ request });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async delete(@Res() res: Response, @Param('id') id: number): Promise<any> {
    try {
      await this.requestService.delete(id);

      res.status(200).end();
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
