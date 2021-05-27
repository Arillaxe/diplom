import { User } from './user.model';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useValue: User,
  },
];
