import { Logger } from '@implicity-healthcare/nest-logger';
import { TBiotronikAPITransmissionListDTO } from './biotronik.api.dto';
import path from 'node:path';
import { MockDatasource } from './mock.datasource';
import { Injectable } from '@nestjs/common';
import { HttpError } from '../../../app.error';

@Injectable()
export class BiotronikApiService {
    private readonly logger: Logger;

    constructor(private readonly dataSource: MockDatasource) {
        this.logger = new Logger(this.constructor.name);
    }

    public getTransmissionPathById(clientId: string, biotronikTransmissionId: string): string {
        this.logger.info(`Getting transmission ${biotronikTransmissionId} for clientId ${clientId}`);
        const transmission = this.dataSource.getTransmissionById(clientId, biotronikTransmissionId);
        if (!transmission) {
            throw new HttpError('Transmission not found', 404);
        }
        return path.join(__dirname, 'transmissions', `${transmission.xmlFilename}.xml`);
    }

    async getTransmissionList(clientId: string): Promise<TBiotronikAPITransmissionListDTO> {
        this.logger.info(`Getting transmission list for clientId "${clientId}`);
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return { exports: this.dataSource.getTransmissions(clientId).map(({ transmissionId, patient, created_date }) => {
                return { id: transmissionId, patient, created_at: created_date };
            }),
        };
    }
}
