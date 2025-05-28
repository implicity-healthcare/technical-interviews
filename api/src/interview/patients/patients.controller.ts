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
    public async getVitalHistory(
        @Param() params: PatientVitalHistoryQueryParamsDto
    ): Promise<VitalHistoryPointDto[]> {
        // Simulate random delay (0-3 seconds)
        const delay = Math.random() * 3000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Simulate random errors (20% chance)
        if (Math.random() <= 0.2) {
            throw new Error('Simulated server error');
        }
        return this.patientsService.getVitalHistory(params.patientId, params.vitalType);
    }
}
