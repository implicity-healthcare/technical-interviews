import { IsNotEmpty, IsNumber } from 'class-validator';

import { IsString } from 'class-validator';

export class PatientProfileDto {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    age!: number;

    @IsString()
    @IsNotEmpty()
    roomNumber!: string;

    @IsString()
    @IsNotEmpty()
    condition!: string;
}
