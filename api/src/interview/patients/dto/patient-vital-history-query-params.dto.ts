import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VitalType } from './vital-signs.dto';

export class PatientVitalHistoryQueryParamsDto {
    @IsString()
    @IsNotEmpty()
    patientId!: string;

    @IsEnum(VitalType)
    @IsNotEmpty()
    vitalType!: VitalType;
}
