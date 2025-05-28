import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PatientProfileDto } from './dto/patient-profile.dto';
import { LatestVitalSignsDto, VitalHistoryPointDto } from './dto/vital-signs.dto';

@Injectable()
export class PatientsService {
    list(): Array<PatientProfileDto> {
        const patients: Array<PatientProfileDto> = [];
    
        for (let i = 0; i < 10; i++) {
            const patientId = faker.string.uuid();
            faker.seed(this.hashCode(patientId));
            
            patients.push({
                id: patientId,
                name: faker.person.fullName(),
                age: faker.number.int({ min: 18, max: 95 }),
                roomNumber: `${faker.helpers.arrayElement([
                    'ICU',
                    'ER',
                    'WARD',
                    'CCU',
                ])}-${faker.number.int({ min: 100, max: 999 })}`,
                condition: faker.helpers.arrayElement([
                    'Stable post-op',
                    'Critical but stable',
                    'Recovering well',
                    'Under observation',
                    'Stable condition',
                    'Post-surgical recovery',
                    'Monitoring required',
                ]),
            });
        }
        
        return patients;
    }

    getPatientProfile(patientId: string): PatientProfileDto {
        // Use patientId as seed for consistent data for the same patient
        faker.seed(this.hashCode(patientId));

        return {
            id: patientId,
            name: faker.person.fullName(),
            age: faker.number.int({ min: 18, max: 95 }),
            roomNumber: `${faker.helpers.arrayElement([
                'ICU',
                'ER',
                'WARD',
                'CCU',
            ])}-${faker.number.int({ min: 100, max: 999 })}`,
            condition: faker.helpers.arrayElement([
                'Stable post-op',
                'Critical but stable',
                'Recovering well',
                'Under observation',
                'Stable condition',
                'Post-surgical recovery',
                'Monitoring required',
            ]),
        };
    }

    getLatestVitalSigns(patientId: string): LatestVitalSignsDto {
        // Generate different vitals each time (no seed for real-time variation)
        const heartRate = faker.number.int({ min: 50, max: 160 });
        const systolic = faker.number.int({ min: 80, max: 150 });
        const diastolic = faker.number.int({ min: 70, max: 100 });
        const spO2 = faker.number.int({ min: 95, max: 100 });
        const temperature = faker.number.float({
            min: 36.0,
            max: 38.5,
            fractionDigits: 1,
        });

        return {
            heartRate: {
                value: heartRate,
                unit: 'bpm',
                status: this.getVitalStatus(heartRate, 60, 100),
            },
            bloodPressure: {
                systolic,
                diastolic,
                unit: 'mmHg',
                status: this.getBloodPressureStatus(systolic, diastolic),
            },
            spO2: {
                value: spO2,
                unit: '%',
                status: this.getVitalStatus(spO2, 95, 100),
            },
            temperature: {
                value: temperature,
                unit: '°C',
                status: this.getVitalStatus(temperature, 36.1, 37.2),
            },
        };
    }

    getVitalHistory(patientId: string, vitalType: string): VitalHistoryPointDto[] {
        // Use patientId + vitalType as seed for consistent history
        faker.seed(this.hashCode(patientId + vitalType));

        const baseTime = faker.date.recent({ days: 1 });
        const history: VitalHistoryPointDto[] = [];

        // Generate baseline value based on vital type
        let baseValue: number;
        let variance: number;

        switch (vitalType.toLowerCase()) {
            case 'heartrate':
                baseValue = faker.number.int({ min: 65, max: 85 });
                variance = 10;
                break;
            case 'bloodpressure':
                baseValue = faker.number.int({ min: 110, max: 130 });
                variance = 15;
                break;
            case 'spo2':
                baseValue = faker.number.int({ min: 96, max: 99 });
                variance = 2;
                break;
            case 'temperature':
                baseValue = faker.number.float({
                    min: 36.5,
                    max: 37.5,
                    fractionDigits: 1,
                });
                variance = 0.5;
                break;
            default:
                throw new Error(`Invalid vital type: ${vitalType}`);
        }

        for (let i = 0; i < faker.number.int({ min: 10, max: 15 }); i++) {
            const timestamp = new Date(baseTime.getTime() + i * 5 * 60 * 1000); // 5-minute intervals
            const variation = faker.number.float({
                min: -variance,
                max: variance,
                fractionDigits: 1,
            });
            const value = Math.round((baseValue + variation) * 10) / 10; // Round to 1 decimal

            history.push({
                timestamp: timestamp.toISOString(),
                value: value,
            });
        }

        return history.sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
    }

    private getVitalStatus(value: number, normalMin: number, normalMax: number): string {
        if (value < normalMin) return 'low';
        if (value > normalMax) return 'high';
        return 'normal';
    }

    private getBloodPressureStatus(systolic: number, diastolic: number): string {
        if (systolic > 140 || diastolic > 90) return 'high';
        if (systolic < 90 || diastolic < 60) return 'low';
        return 'normal';
    }

    private hashCode(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }
}


