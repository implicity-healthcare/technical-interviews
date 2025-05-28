import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { PatientProfileDto } from './dto/patient-profile.dto';
import { PatientVitalHistoryQueryParamsDto } from './dto/patient-vital-history-query-params.dto';
import { LatestVitalSignsDto, VitalHistoryPointDto } from './dto/vital-signs.dto';
import { PatientsService } from './patients.service';

@Controller('api/patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Get('/list')
    getPatientList(): Array<PatientProfileDto> {
        return this.patientsService.list()
    }

    @Get(':patientId/profile')
    getPatientProfile(@Param('patientId') patientId: string): PatientProfileDto {
        return this.patientsService.getPatientProfile(patientId);
    }

    @Get(':patientId/vitals/latest')
    getLatestVitalSigns(@Param('patientId') patientId: string): LatestVitalSignsDto {
        return this.patientsService.getLatestVitalSigns(patientId);
    }

    @Get(':patientId/vitals/:vitalType/history')
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )
    getVitalHistory(
        @Param() params: PatientVitalHistoryQueryParamsDto
    ): VitalHistoryPointDto[] {
        return this.patientsService.getVitalHistory(params.patientId, params.vitalType);
    }
}
