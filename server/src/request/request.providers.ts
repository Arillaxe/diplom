import { Request } from './request.model';

export const requestProviders = [
  {
    provide: 'REQUEST_MODEL',
    useValue: Request,
  },
];
