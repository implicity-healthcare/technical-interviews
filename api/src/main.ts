import { Logger } from '@implicity-healthcare/nest-logger';
import '@implicity-healthcare/nest-toolkit/lib/instrumentation';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import { ApplicationModule } from './app.module';

const logger = new Logger('bootstrap');
const PORT = parseInt(process.env.PORT || '3007');

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(
        ApplicationModule,
        new ExpressAdapter(),
        { logger }
    );
    app.use(json({ limit: '5mb' }));
    app.enableCors();
    await app.listen(PORT, '0.0.0.0');
}

if (isNaN(PORT)) {
    logger.error('Wrong port provided. 👏');
    process.exit(666);
}

bootstrap().then(() =>
    logger.info(
        `wild-card service (v${process.env.npm_package_version}) listening 👍: ${PORT}`
    )
);
