import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { requestProviders } from './request.providers';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [RequestController],
  providers: [
    RequestService,
    ...requestProviders,
  ],
  exports: [RequestService],
})
export class RequestModule {}
