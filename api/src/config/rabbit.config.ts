import {
    EExchangeType,
    NestRabbitConfigurationNamespace,
    TModuleConfiguration,
} from '@implicity-healthcare/nest-rabbit';
import { registerAs } from '@nestjs/config';

export const DATA_COLLECTOR_TOPIC_EXCHANGE = 'data-collector.topic.exchange';
export const DATA_COLLECTOR_BP_COLLECTED_ROUTING_KEY = 'data-collector.data.blood-pressure.collected.route';

export default registerAs(NestRabbitConfigurationNamespace, (): TModuleConfiguration => ({
    urls: [
        process.env.RABBIT_MQ_URI || 'amqp://cied:cied@localhost:5672',
    ],
    auto: true,
    logging: true,
    exchanges: [
        {
            name: DATA_COLLECTOR_TOPIC_EXCHANGE,
            type: EExchangeType.Topic,
            options: {
                durable: true,
                internal: false,
                autoDelete: false,
                arguments: [],
            },
        },
    ],
    queues: [],
}));
