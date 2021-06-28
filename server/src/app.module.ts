import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { FacultyModule } from './faculty/faculty.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    AuthModule,
    CourseModule,
    FacultyModule,
    UserModule,
    RoomModule,
    RequestModule,
  ],
})
export class AppModule {}
