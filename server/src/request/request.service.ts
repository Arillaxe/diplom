import { Injectable, Inject } from '@nestjs/common';
import { Request } from './request.model';
import { CreateRequestDto, UpdateRequestStatusDto } from './request.dto';

@Injectable()
export class RequestService {
  constructor(@Inject('REQUEST_MODEL') private requestModel: typeof Request) {}

  async findAll({ offset = 0, limit = 50 } = {}): Promise<{ requests: Request[], total: number}> {
    const requests = await this.requestModel.findAll<Request>({ offset, limit });
    const total = await this.requestModel.count();

    return { requests, total };
  }

  findByFullName(fullName: string): Promise<Request> {
    return this.requestModel.findOne<Request>({ where: { fullName }});
  }

  async create(requestDto: CreateRequestDto) {
    const createdRequest = await this.requestModel.create({ ...requestDto, status: 'DEKANAT_VERIFY' });

    return await createdRequest.save();
  }

  async updateStatus(id: number, requestDto: UpdateRequestStatusDto) {
    const request = await this.requestModel.findOne({ where: { id } });

    await request.update(requestDto);

    return request;
  }

  delete(id: number) {
    return this.requestModel.destroy({ where: { id } });
  }
}
