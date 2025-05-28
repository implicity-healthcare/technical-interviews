import { faker } from '@faker-js/faker';
import { Controller, Get, Logger, Param } from '@nestjs/common';

export enum EBilobaMeasureType {
    Weight = 'weight',
    SystolicBloodPressure = 'systolic-blood-pressure',
    DiastolicBloodPressure = 'diastolic-blood-pressure',
}

export type TBilobaMeasureModel = {
	id: string;
	deviceId: string;
	value: number;
	date: string;
	type: EBilobaMeasureType;
};


@Controller()
export class BilobaController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger(this.constructor.name);
	}

	@Get('/devices/:deviceId/measures')
	getMeasures(
		@Param('deviceId') deviceId: string,
	): TBilobaMeasureModel[] {
		this.logger.log('Biloba.getMeasures()');
		
		return [
			{
				id: faker.string.uuid(),
				deviceId,
				value: faker.number.int({ max: 150, min: 100 }),
				date: new Date().toISOString(),
				type: EBilobaMeasureType.SystolicBloodPressure,
			},
			{
				id: faker.string.uuid(),
				deviceId,
				value: faker.number.int({ max: 90, min: 30 }),
				date: new Date().toISOString(),
				type: EBilobaMeasureType.DiastolicBloodPressure,
			},
		];
	}
}
