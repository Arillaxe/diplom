import { Injectable, Inject } from '@nestjs/common';
import { CreateFacultyDto, UpdateFacultyDto } from './faculty.dto';
import { Faculty } from './faculty.model';

@Injectable()
export class FacultyService {
  constructor(@Inject('FACULTY_MODEL') private courseModel: typeof Faculty) {}

  async findAll({ offset = 0, limit = 50 } = {}): Promise<{ faculties: Faculty[], total: number}> {
    const faculties = await this.courseModel.findAll<Faculty>({ offset, limit });
    const total = await this.courseModel.count();

    return { faculties, total };
  }

  async create(courseDto: CreateFacultyDto) {
    const createdCourse = await this.courseModel.create(courseDto);

    return await createdCourse.save();
  }

  async update(courseDto: UpdateFacultyDto) {
    const course = await this.courseModel.findOne({ where: { id: courseDto.id } });

    await course.update(courseDto);

    return course;
  }

  delete(id: number) {
    return this.courseModel.destroy({ where: { id } });
  }
}
