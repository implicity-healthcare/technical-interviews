import { WithingsMeasureGroupsDTO, WithingsResponse } from '../withings.dto';
import { Injectable } from '@nestjs/common';
import * as measuresDevice1 from './samples/weight-scale.measure.device-1.json';
import { EMeasureType } from './measure-type.enum';
import { faker } from '@faker-js/faker';

const refreshTokenDevice1 = '071bd3d5-0462-4da7-9b98-751db755f8bd'.split('').reverse().join('');

const withingWeightScalesDeviceIds: { [key: string]: { response: WithingsResponse<WithingsMeasureGroupsDTO> } } = {
    [refreshTokenDevice1]: {
        response: measuresDevice1,
    },
};

@Injectable()
export class WithingsMeasurementService {

	public getMeasurements(measureType: EMeasureType, authorization?: string): WithingsResponse<WithingsMeasureGroupsDTO> {
        const token = authorization?.replace('Bearer ', '');
        if (token && withingWeightScalesDeviceIds[token]) {
            return withingWeightScalesDeviceIds[token].response;
        }

		return {
			status: 0,
			body: {
				updatetime: 1725546334,
				timezone: 'Europe/Paris',
				measuregrps: [
					{
						grpid: 4731861571,
						attrib: 0,
						date: new Date().getTime() / 1000,
						created: new Date().getTime() / 1000,
						modified: new Date().getTime() / 1000,
						category: 1,
						deviceid: 12045402,
						hash_deviceid: 'c0d41cefd14e2ab8c9490f396af7654b34177092', //TODO: getFrom list
						measures: [
							{
								value: faker.number.int({ min: 10, max: 100 }),
								type: measureType,
								unit: 0,
							},
						],
						modelid: 46,
						model: 'Fake Device',
						comment: null,
					},
				],
			},
		};
	}
}
