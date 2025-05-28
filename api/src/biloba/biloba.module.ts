import { Module } from '@nestjs/common';
import { BilobaController } from './biloba.controller';

@Module({
	controllers:[BilobaController],
})
export class BilobaModule {

}
