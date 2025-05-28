import { Injectable } from '@nestjs/common';

export type TBiotronikFakeTransmissionDTO = {
    clientId: string;
    transmissionId: string;
    xmlFilename: string;
    patient: string;
    created_date: string;
};

@Injectable()
export class MockDatasource {
    private readonly transmissions: TBiotronikFakeTransmissionDTO[] = [
        {
            clientId: 'french',
            transmissionId: '1c908eac4438d19d0144548b45551b97',
            xmlFilename: 'IM-20916-1',
            patient: '12345',
            created_date: new Date().toISOString(),
        },
        {
            clientId: 'french',
            transmissionId: '2c908eac4438d19d0144548b45551b97',
            xmlFilename: 'IM-20916-2a',
            patient: '678910',
            created_date: new Date().toISOString(),
        },
        {
            clientId: 'french',
            transmissionId: '2c908eac4438d19d0144548b45551b98',
            xmlFilename: 'IM-20916-2b',
            patient: '678910',
            created_date: new Date().toISOString(),
        },
        {
            clientId: 'french',
            transmissionId: '3c908eac4438d19d0144548b45551b97',
            xmlFilename: 'IM-20916-3',
            patient: '111213',
            created_date: new Date().toISOString(),
        },
        {
            clientId: 'french',
            transmissionId: '4c908eac4438d19d0144548b45551b97',
            xmlFilename: 'IM-20916-4a',
            patient: '141516',
            created_date: new Date().toISOString(),
        },
        {
            clientId: 'french',
            transmissionId: '4c908eac4438d19d0144548b45551b98',
            xmlFilename: 'IM-20916-4b',
            patient: '141516',
            created_date: new Date().toISOString(),
        },
        {
            clientId: 'french',
            transmissionId: '5c908eac4438d19d0144548b45551b97',
            xmlFilename: 'IM-20916-5a',
            patient: '171819',
            created_date: new Date().toISOString(),
        },
        {
            clientId: 'french',
            transmissionId: '5c908eac4438d19d0144548b45551b98',
            xmlFilename: 'IM-20916-5b',
            patient: '171819',
            created_date: new Date().toISOString(),
        },
        {
            clientId: 'french',
            transmissionId: '5c908eac4438d19d0144548b45551b99',
            xmlFilename: 'IM-20916-5c',
            patient: '171819',
            created_date: new Date().toISOString(),
        },
    ];

    public getTransmissionById(clientId: string, transmissionId: string): Pick<TBiotronikFakeTransmissionDTO, 'transmissionId' | 'xmlFilename'> | undefined {
        return this.transmissions.find(vendorTransmission => vendorTransmission.clientId === clientId && vendorTransmission.transmissionId === transmissionId);

    }

    public getTransmissions(clientId: string): Pick<TBiotronikFakeTransmissionDTO, 'transmissionId' | 'patient' | 'created_date'>[] {
        return this.transmissions
            .filter(t => t.clientId === clientId);
    }
}
