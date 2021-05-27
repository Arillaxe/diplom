import { Injectable, Inject } from '@nestjs/common';
import { Room } from './room.model';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';

@Injectable()
export class RoomService {
  constructor(@Inject('ROOM_MODEL') private roomModel: typeof Room) {}

  findAll(): Promise<Room[]> {
    return this.roomModel.findAll<Room>();
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
