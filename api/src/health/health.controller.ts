import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    HealthIndicatorResult,
    MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { NestRabbitConfigurationNamespace, } from '@implicity-healthcare/nest-rabbit';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
    constructor(
        private healthCheckService: HealthCheckService,
        private microserviceHealthIndicator: MicroserviceHealthIndicator,
        private configService: ConfigService,
    ) {}

    @Get()
    @HealthCheck()
    check(): Promise<HealthCheckResult> {
        const rabbitConfiguration = this.configService.get(NestRabbitConfigurationNamespace);

        if (!rabbitConfiguration) {
            throw new ServiceUnavailableException();
        }

        const rabbitHealthCheck = async (): Promise<HealthIndicatorResult> =>
            this.microserviceHealthIndicator.pingCheck('broker', {
                transport: Transport.RMQ,
                options: {
                    urls: rabbitConfiguration.urls,
                },
            });

        return this.healthCheckService.check([
            async (): Promise<HealthIndicatorResult> => ({ service: { status: 'up' } }),
            rabbitHealthCheck,
        ]);
    }
}

