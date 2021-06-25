import { Course } from './course.model';

export const courseProviders = [
  {
    provide: 'COURSE_MODEL',
    useValue: Course,
  },
];
