import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Query } from '@nestjs/common';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async login(@Res() res: Response, @Query() query): Promise<any> {
    try {
      const { offset, limit } = query;
      const { courses, total } = await this.courseService.findAll({ offset, limit });

      res.json({ courses, total });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async create(@Res() res: Response, @Body() courseDto: CreateCourseDto): Promise<any> {
    try {
      const course = await this.courseService.create(courseDto);

      res.json({ course });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Put('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Dekanat)
  async update(@Res() res: Response, @Body() courseDto: UpdateCourseDto): Promise<any> {
    try {
      const course = await this.courseService.update(courseDto);

      res.json({ course });
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
