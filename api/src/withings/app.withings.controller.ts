import { faker } from '@faker-js/faker';
import { Logger } from '@implicity-healthcare/nest-logger';
import {
    BadRequestException,
    Body,
    Controller,
    Post,
    Request,
    UseInterceptors,
} from '@nestjs/common';
import { WithingsDropshipmentService } from './service/withings.dropshipment.service';
import {
	WithingsAccessTokenDTO,
	WithingsActivatedUserDTO,
	WithingsDeviceDeactivationDTO,
	WithingsMeasureGroupsDTO,
	WithingsNonceDTO,
	WithingsResponse,
} from './withings.dto';
import { WithingsSleepAnalyzerService } from './service/withings.sleep-analyzer.service';
import { WithingsMeasurementService } from './service/withings.measurement.service';
import { WithingsDeviceService } from './service/withings.device.service';
import { WithingsAuthenticationService } from './service/withings.authentication.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { EMeasureType } from './service/measure-type.enum';


@Controller('/withings')
export class AppWithingsController {
	private readonly logger: Logger;

	constructor(
		private readonly dropshipmentService: WithingsDropshipmentService,
		private readonly sleepAnalyzerService: WithingsSleepAnalyzerService,
		private readonly measurementService: WithingsMeasurementService,
		private readonly deviceService: WithingsDeviceService,
		private readonly authenticationService: WithingsAuthenticationService,
	) {
		this.logger = new Logger(AppWithingsController);
	}

	@Post('/v2/signature')
	getNonce(): WithingsResponse<WithingsNonceDTO> {
		this.logger.info('.getNonce()');
		return {
			status: 0,
			body: {
				nonce: faker.string.alphanumeric({ length: 12 }),
			},
		};
	}

	@Post('/v2/user')
	activateUserWithDevice(
		@Body() payload: any
	): WithingsResponse<WithingsActivatedUserDTO> {
		switch (payload.action) {
			case 'activate':
				this.logger.info('.activateUserWithDevice()');
				return this.deviceService.getDevices();
			case 'getdevice':
				this.logger.info('.getUserDevices()');
				return this.deviceService.getDevices();
			default: 
				throw new Error(`Not supported action: ${ payload.action }`);
		}
	}

	@Post('/notify')
	subscribe(): WithingsResponse<unknown> {
		this.logger.info('.subscribe()');
		return {
			status: 0,
			body: undefined,
		};
	}

	@Post('/v2/oauth2')
    @UseInterceptors(FileInterceptor('refresh_token'))
	getAccessToken(
        @Body() payload: any,
    ): WithingsResponse<WithingsAccessTokenDTO> {
		this.logger.info('.getAccessToken()');
        switch (payload?.grant_type) {
            case 'authorization_code':
                return {
                    status: 0,
                    body: {
                        access_token: faker.string.alphanumeric({ length: 16 }),
                        csrf_token: faker.string.alphanumeric({ length: 16 }),
                        refresh_token: faker.string.alphanumeric({ length: 16 }),
                        scope: 'scope',
                        expires_in: faker.number.int(),
                        token_type: 'fake',
                    },
                };
            case 'refresh_token':
                return this.authenticationService.getAuthentication(payload.refresh_token);
            default:
                throw new BadRequestException(`Unknown grant_type: ${payload.grant_type}`);
        }
	}

	@Post('/v2/dropshipment')
	handleDropshipment(
		@Body() payload: any,
	): WithingsResponse<any> {
		this.logger.info(`.handleDroipshipment() action: ${ payload.action }`);
		switch (payload.action) {
			case 'createorder':
				return this.dropshipmentService.create(payload);
			case 'update':
				return this.dropshipmentService.update(payload);
			case 'delete':
				return this.dropshipmentService.cancel(payload);
			default:
				throw new BadRequestException(`Action "${ payload.action }" not supported`);
		}
	}

	@Post('/v2/order')
	getDropshipmentOrder(
		@Body() payload: any,
	): WithingsResponse<any> {
		this.logger.info({
			message: '.getDropshipmentOrder()',
			meta: { payload },
		});
		return this.dropshipmentService.get(payload);
	}

	@Post('/measure')
	public getMeasures(
		@Request() request: any,
		@Body() payload: { meastype: EMeasureType },
	): WithingsResponse<WithingsMeasureGroupsDTO> {
        const authorization = request.headers.authorization;
		this.logger.info({
			message: '.postMeasures()',
			meta: { authorization, payload },
		});
		return this.measurementService.getMeasurements(payload.meastype, authorization);
	}

	@Post('/v2/device')
	public deactivateDevice(
		@Body() payload: any,
	): WithingsResponse<WithingsDeviceDeactivationDTO> {
		this.logger.info({
			message: '.deactivateDevice()',
			meta: { payload },
		});

		return {
			status: 0,
			body: {
				new_sim_status: 'STANDBY',
				termination_date: 1656518088,
			},
		};
	}


	@Post('v2/sleep')
	public getSleep(
		@Body() payload: any,
	): WithingsResponse<any> {
		this.logger.info({
			message: '.getSleep()',
			meta: { payload },
		});

		return (payload.action === 'getsummary')
			? this.sleepAnalyzerService.getSleepSummary()
			: this.sleepAnalyzerService.getSleepAnalysis();
	}
}

