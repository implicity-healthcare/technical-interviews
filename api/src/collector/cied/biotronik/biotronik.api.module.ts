import { Module } from '@nestjs/common';
import { MockDatasource } from './mock.datasource';
import { BiotronikApiTaskController } from './biotronik.api.task.controller';
import { BiotronikApiService } from './biotronik.api.service';

@Module({
    controllers: [BiotronikApiTaskController],
    providers: [
        BiotronikApiService,
        MockDatasource,
    ],
})
export class BiotronikApiModule {}
