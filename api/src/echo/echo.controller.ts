import { Logger } from '@implicity-healthcare/nest-logger';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('echo')
export class EchoController {
    private readonly logger: Logger;

    constructor() {
        this.logger = new Logger(EchoController.name);
    }

    @Post('')
    public async getLastTransmissionStatusStats(
        @Body() body: any,
    ): Promise<void> {
        console.log('Received body : ', body);
    }
}
