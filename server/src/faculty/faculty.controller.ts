import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto, UpdateFacultyDto } from './faculty.dto';
import { Query } from '@nestjs/common';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly courseService: FacultyService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async login(@Res() res: Response, @Query() query): Promise<any> {
    try {
      const { offset, limit } = query;
      const { faculties, total } = await this.courseService.findAll({ offset, limit });

      res.json({ faculties, total });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async create(@Res() res: Response, @Body() courseDto: CreateFacultyDto): Promise<any> {
    try {
      const faculty = await this.courseService.create(courseDto);

      res.json({ faculty });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Put('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async update(@Res() res: Response, @Body() courseDto: UpdateFacultyDto): Promise<any> {
    try {
      const faculty = await this.courseService.update(courseDto);

      res.json({ faculty });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async delete(@Res() res: Response, @Param('id') id: number): Promise<any> {
    try {
      await this.courseService.delete(id);

      res.status(200).end();
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
