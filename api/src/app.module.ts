import { LoggingInterceptor } from '@implicity-healthcare/nest-logger';
import { NestRabbitModule } from '@implicity-healthcare/nest-rabbit';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { BilobaModule } from './biloba/biloba.module';
import { DataCollectedTaskModule } from './collector/blood-pressure-monitor/withings/data-collected.task.module';
import { BiotronikApiModule } from './collector/cied/biotronik/biotronik.api.module';
import rabbitConfig from './config/rabbit.config';
import { EchoModule } from './echo/echo.module';
import { EdgeClinicaModule } from './edge-clinica/edge-clinica.module';
import { HealthModule } from './health/health.module';
import { InterviewModule } from './interview/interview.module';
import { AppWithingsController } from './withings/app.withings.controller';
import { WithingsAuthenticationService } from './withings/service/withings.authentication.service';
import { WithingsDeviceService } from './withings/service/withings.device.service';
import { WithingsDropshipmentService } from './withings/service/withings.dropshipment.service';
import { WithingsMeasurementService } from './withings/service/withings.measurement.service';
import { WithingsSleepAnalyzerService } from './withings/service/withings.sleep-analyzer.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        DataCollectedTaskModule,
        BiotronikApiModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [rabbitConfig],
        }),
        NestRabbitModule,
        BilobaModule,
        EdgeClinicaModule,
        EchoModule,
        HealthModule,
        InterviewModule,
    ],
    controllers: [AppWithingsController],
    providers: [
        WithingsDropshipmentService,
        WithingsSleepAnalyzerService,
        WithingsMeasurementService,
        WithingsDeviceService,
        WithingsAuthenticationService,
        {
            provide: APP_INTERCEPTOR,
            useValue: new LoggingInterceptor(),
        },
    ],
})
export class ApplicationModule {}
