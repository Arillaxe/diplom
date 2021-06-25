import { Injectable, Inject } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Course } from './course.model';

@Injectable()
export class CourseService {
  constructor(@Inject('COURSE_MODEL') private courseModel: typeof Course) {}

  async findAll({ offset = 0, limit = 50 } = {}): Promise<{ courses: Course[], total: number}> {
    const courses = await this.courseModel.findAll<Course>({ offset, limit });
    const total = await this.courseModel.count();

    return { courses, total };
  }

  async create(courseDto: CreateCourseDto) {
    const createdCourse = await this.courseModel.create(courseDto);

    return await createdCourse.save();
  }

  async update(courseDto: UpdateCourseDto) {
    const course = await this.courseModel.findOne({ where: { id: courseDto.id } });

    await course.update(courseDto);

    return course;
  }

  delete(id: number) {
    return this.courseModel.destroy({ where: { id } });
  }
}
