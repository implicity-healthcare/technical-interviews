import { Injectable } from '@nestjs/common';
import { NestRabbitService } from '@implicity-healthcare/nest-rabbit';
import { DATA_COLLECTOR_BP_COLLECTED_ROUTING_KEY, DATA_COLLECTOR_TOPIC_EXCHANGE } from '../../../config/rabbit.config';
import { Logger } from '@implicity-healthcare/nest-logger';
import { faker } from '@faker-js/faker';
import { map } from 'bluebird';
import { MockDatasource } from './mock.datasource';

export type TMockedMeasure = {
    typeLabel: string,
    typeId: number,
    value: number,
};

@Injectable()
export class DataCollectedTaskService {
    private readonly logger;

    constructor(
        private readonly mockDatasource: MockDatasource,
        private readonly rabbitService: NestRabbitService,
    ) {
        this.logger = new Logger(DataCollectedTaskService.name);
    }

    public async sendSameFakeMeasures(deviceId?: string, time?: number): Promise<void> {
        const deviceIdentifier = deviceId || this.mockDatasource.getDeviceId();
        const repeat = time || 10;

        this.logger.debug(`sendSameFakeMeasures(deviceId: ${deviceIdentifier}, repeat: ${repeat})...`);

        const mockedDataInput = [
            { typeLabel: 'diastolic-blood-pressure', typeId: 9, value: faker.number.int({ min: 60, max: 90 }) },
            { typeLabel: 'systolic-blood-pressure', typeId: 10, value: faker.number.int({ min: 90, max: 140 }) },
            { typeLabel: 'sp02', typeId: 54, value: faker.number.int({ min: 10, max: 100 }) },
            { typeLabel: 'heart-pulse', typeId: 11, value: faker.number.int({ min: 10, max: 100 }) },
        ];

        const mockedMeasures = mockedDataInput.map(input => this.buildMeasure(deviceIdentifier, input));

        for (let i = 0; i < repeat; i++) {
            await map(
                mockedMeasures,
                mockedMeasure => this.rabbitService.publish(DATA_COLLECTOR_TOPIC_EXCHANGE, DATA_COLLECTOR_BP_COLLECTED_ROUTING_KEY, mockedMeasure),
            );
        }
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    public async sendFakeMeasure(deviceId?: string, realm?: string): Promise<void> {
        const deviceIdentifier = deviceId || this.mockDatasource.getDeviceId();

        this.logger.debug(`sendFakeMeasure(deviceId: ${deviceIdentifier})...`);
        const mockedMeasures = [
            { typeLabel: 'diastolic-blood-pressure', typeId: 9, value: faker.number.int({ min: 60, max: 90 }) },
            { typeLabel: 'systolic-blood-pressure', typeId: 10, value: faker.number.int({ min: 90, max: 140 }) },
            { typeLabel: 'sp02', typeId: 54, value: faker.number.int({ min: 10, max: 100 }) },
            { typeLabel: 'heart-pulse', typeId: 11, value: faker.number.int({ min: 10, max: 100 }) },
        ];

        await map(mockedMeasures, async mockedMeasure =>
            this.rabbitService.publish(
                DATA_COLLECTOR_TOPIC_EXCHANGE,
                DATA_COLLECTOR_BP_COLLECTED_ROUTING_KEY,
                this.buildMeasure(deviceIdentifier, mockedMeasure, realm),
            ),
        );
    }

    private buildMeasure(
        manufacturerDeviceId: string,
        mockedMeasure: TMockedMeasure,
        realm = 'HEALTH',
    ): any {
        return {
            realm,
            timestamp: Math.trunc(new Date().getTime() / 1000),
            source: {
                vendor: 'WITHINGS',
                method: 'API',
                version: '1',
                context: {},
                type: mockedMeasure.typeLabel,
            },
            data: [
                {
                    status: 0,
                    body: {
                        updatetime: Math.trunc(new Date().getTime() / 1000),
                        timezone: 'Europe/Paris',
                        measuregrps: [
                            {
                                grpid: 4731861571,
                                attrib: 0,
                                date: Math.trunc(new Date().getTime() / 1000),
                                created: Math.trunc(new Date().getTime() / 1000),
                                modified: Math.trunc(new Date().getTime() / 1000),
                                category: 1,
                                deviceid: 12045402,
                                hash_deviceid: manufacturerDeviceId,
                                measures: [
                                    {
                                        value: mockedMeasure.value,
                                        type: mockedMeasure.typeId,
                                        unit: 0,
                                        algo: 0,
                                        fm: 3,
                                    },
                                ],
                                modelid: 46,
                                model: 'BPM Connect Pro',
                                comment: null,
                            },
                        ],
                    },
                },
            ],
        };
    }
}
