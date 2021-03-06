import { Injectable, Inject } from '@nestjs/common';
import { Room } from './room.model';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';

@Injectable()
export class RoomService {
  constructor(@Inject('ROOM_MODEL') private roomModel: typeof Room) {}

  async findAll({ offset = 0, limit = 50 } = {}): Promise<{ rooms: Room[], total: number}> {
    const rooms = await this.roomModel.findAll<Room>({ offset, limit });
    const total = await this.roomModel.count();

    return { rooms, total };
  }

  async create(roomDto: CreateRoomDto) {
    const createdRoom = await this.roomModel.create(roomDto);

    return await createdRoom.save();
  }

  async update(roomDto: UpdateRoomDto) {
    const room = await this.roomModel.findOne({ where: { id: roomDto.id } });

    await room.update(roomDto);

    return room;
  }

  delete(id: number) {
    return this.roomModel.destroy({ where: { id } });
  }
}
