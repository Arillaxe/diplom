import { Faculty } from './faculty.model';

export const facultyProviders = [
  {
    provide: 'FACULTY_MODEL',
    useValue: Faculty,
  },
];
