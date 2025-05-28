import { Module } from '@nestjs/common';
import { DataCollectedTaskService } from './data-collected.task.service';
import { DataCollectedTaskController } from './data-collected.task.controller';
import { MockDatasource } from './mock.datasource';

@Module({
    controllers: [DataCollectedTaskController],
    providers: [
        DataCollectedTaskService,
        MockDatasource,
    ],
})
export class DataCollectedTaskModule {}
