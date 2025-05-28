import { DataCollectedTaskService } from './data-collected.task.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Logger } from '@implicity-healthcare/nest-logger';

@Controller('/collector/tasks/blood-pressure-monitor/withings')
export class DataCollectedTaskController {
    private readonly logger: Logger;

    constructor(
        private readonly dataCollectedTaskService: DataCollectedTaskService,
    ) {
        this.logger = new Logger(this.constructor.name);
    }

    @Post('data-collected/same')
    public async simulateSameDataCollected(
        @Body() body: any,
    ): Promise<void> {
        await this.dataCollectedTaskService.sendSameFakeMeasures(body.deviceId, body.time);
    }

    @Post('data-collected')
    public async simulateDataCollected(
        @Body() body: any,
    ): Promise<void> {
        if (!body.time) {
            return this.dataCollectedTaskService.sendFakeMeasure(body.deviceId, body.realm);
        }

        for (let i = 0; i < body.time; i++) {
            await this.dataCollectedTaskService.sendFakeMeasure(body.deviceId, body.realm);
        }
    }

}
