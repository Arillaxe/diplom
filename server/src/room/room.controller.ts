import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async login(@Res() res: Response): Promise<any> {
    try {
      const room = await this.roomService.findAll();

      res.json(room);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async create(@Res() res: Response, @Body() roomDto: CreateRoomDto): Promise<any> {
    try {
      const room = await this.roomService.create(roomDto);

      res.json({ room});
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Put('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async update(@Res() res: Response, @Body() roomDto: UpdateRoomDto): Promise<any> {
    try {
      const room = await this.roomService.update(roomDto);

      res.json({ room});
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async delete(@Res() res: Response, @Param('id') id: number): Promise<any> {
    try {
      await this.roomService.delete(id);

      res.status(200).end();
    } catch (e) {
      res.status(400).json(e);
    }
  }
}