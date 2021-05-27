import { Room } from './room.model';

export const roomProviders = [
  {
    provide: 'ROOM_MODEL',
    useValue: Room,
  },
];
