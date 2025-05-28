import { faker } from '@faker-js/faker';
import { EWithingsDeviceType } from '../withings.dto';
import { Logger } from '@implicity-healthcare/nest-logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WithingsDeviceService {
	private logger: Logger;

	constructor() {
		this.logger = new Logger(this.constructor.name);
	}

	getDevices() {
		return {
			status: 0,
			body: {
				devices: [
					{
						deviceid: faker.string.uuid(),
						mac_address: faker.string.alphanumeric({ length: 6 }),
						type: EWithingsDeviceType.BloodPressureMonitor,
						battery: '10',
						last_session_date: faker.date.anytime().getTime(),
						model: faker.vehicle.model(),
						model_id: faker.number.int({ max: 100 }),
						timezone: 'Europe/Paris',
					},
					{
						deviceid: faker.string.uuid(),
						mac_address: faker.string.alphanumeric({ length: 6 }),
						type: EWithingsDeviceType.Scale,
						battery: '10',
						last_session_date: faker.date.anytime().getTime(),
						model: faker.vehicle.model(),
						model_id: faker.number.int({ max: 100 }),
						timezone: 'Europe/Paris',
					},
					{
						deviceid: faker.string.uuid(),
						mac_address: faker.string.alphanumeric({ length: 6 }),
						type: EWithingsDeviceType.SleepMonitor,
						battery: '10',
						last_session_date: faker.date.anytime().getTime(),
						model: faker.vehicle.model(),
						model_id: faker.number.int({ max: 100 }),
						timezone: 'Europe/Paris',
					},
					{
						deviceid: faker.string.uuid(),
						mac_address: faker.string.alphanumeric({ length: 6 }),
						type: EWithingsDeviceType.Gateway,
						battery: '10',
						last_session_date: faker.date.anytime().getTime(),
						model: faker.vehicle.model(),
						model_id: faker.number.int({ max: 100 }),
						timezone: 'Europe/Paris',
					},
				],
				user: {
					code: faker.string.uuid(),
					external_id: faker.string.uuid(),
				},
			},
		};
	}
}
