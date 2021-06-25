import { Module } from '@nestjs/common';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { facultyProviders } from './faculty.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FacultyController],
  providers: [
    FacultyService,
    ...facultyProviders,
  ],
  exports: [FacultyService],
})
export class FacultyModule {}
