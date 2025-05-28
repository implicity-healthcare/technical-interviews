import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { WithingsAccessTokenDTO, WithingsResponse } from '../withings.dto';

@Injectable()
export class WithingsAuthenticationService {
    public getAuthentication(refreshToken: string): WithingsResponse<WithingsAccessTokenDTO> {
        return {
            status: 0,
            body: {
                access_token: refreshToken.split('').reverse().join(''),
                csrf_token: faker.string.alphanumeric({ length: 16 }),
                refresh_token: refreshToken,
                scope: 'scope',
                expires_in: faker.number.int(),
                token_type: 'fake',
            },
        };
    }
}