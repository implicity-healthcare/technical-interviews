import { Controller, Delete, Get, Param, Headers, Res } from '@nestjs/common';
import { Logger } from '@implicity-healthcare/nest-logger';
import { BiotronikApiService } from './biotronik.api.service';
import { TBiotronikAPITransmissionListDTO } from './biotronik.api.dto';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express';

@Controller('/collector/tasks/cied/biotronik')
export class BiotronikApiTaskController {
    private readonly logger: Logger;

    constructor(
        private readonly biotronikApiService: BiotronikApiService,
    ) {
        this.logger = new Logger(this.constructor.name);
    }

    @Get('/rest/api/exports/:vendorTransmissionId')
    public downloadTransmission(
        @Headers('Authorization') auth: string,
        @Param('vendorTransmissionId') vendorTransmissionId: string,
        @Res() res: Response,
    ): void {
        const clientId = this.getClientIdFromAuthorizationHeader(auth);
        const filePath = this.biotronikApiService.getTransmissionPathById(clientId, vendorTransmissionId);
        return res.sendFile(filePath);
    }

    @Get('/rest/api/exports')
    public async getTransmissionList(
        @Headers('Authorization') auth: string,
    ): Promise<TBiotronikAPITransmissionListDTO> {
        const clientId = this.getClientIdFromAuthorizationHeader(auth);
        return this.biotronikApiService.getTransmissionList(clientId);
    }

    @Delete('/rest/api/exports/:vendorTransmissionId')
    public async deleteTransmissionFromQueue(): Promise<void> {
        return;
    }

    private getClientIdFromAuthorizationHeader(auth: string): string {
        const authValue = auth.split(' ')[1];
        const decodedValue = Buffer.from(authValue, 'base64').toString();
        const splitValue = decodedValue.split(':');

        return splitValue[0];
    }
}
