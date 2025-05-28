import { Module } from '@nestjs/common';
import { EdgeClinicaController } from './edge-clinica.controller';

@Module({
	controllers:[EdgeClinicaController],
})
export class EdgeClinicaModule {
}
