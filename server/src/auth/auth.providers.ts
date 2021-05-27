import { PasswordReset } from './passwordReset.model';

export const authProviders = [
  {
    provide: 'PASSWORD_RESET_MODEL',
    useValue: PasswordReset,
  },
];
