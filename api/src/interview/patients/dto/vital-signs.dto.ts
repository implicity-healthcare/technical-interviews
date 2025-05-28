import { IsNotEmpty, IsString } from 'class-validator';

import { IsNumber } from 'class-validator';

export enum VitalType {
    HEART_RATE = 'heartrate',
    BLOOD_PRESSURE = 'bloodpressure',
    SPO2 = 'spo2',
    TEMPERATURE = 'temperature',
}

export class VitalSignValueDto {
    @IsNumber()
    @IsNotEmpty()
    value!: number;

    @IsString()
    @IsNotEmpty()
    unit!: string;

    @IsString()
    @IsNotEmpty()
    status!: string;
}

export class BloodPressureDto {
    @IsNumber()
    @IsNotEmpty()
    systolic!: number;

    @IsNumber()
    @IsNotEmpty()
    diastolic!: number;

    @IsString()
    @IsNotEmpty()
    unit!: string;

    @IsString()
    @IsNotEmpty()
    status!: string;
}

export class LatestVitalSignsDto {
    @IsNotEmpty()
    heartRate!: VitalSignValueDto;

    @IsNotEmpty()
    bloodPressure!: BloodPressureDto;

    @IsNotEmpty()
    spO2!: VitalSignValueDto;

    @IsNotEmpty()
    temperature!: VitalSignValueDto;
}

export class VitalHistoryPointDto {
    @IsString()
    @IsNotEmpty()
    timestamp!: string;

    @IsNumber()
    @IsNotEmpty()
    value!: number;
}
