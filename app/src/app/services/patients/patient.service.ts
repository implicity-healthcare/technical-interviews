import { Patient } from "./patient.dto";

export class PatientService {
    getPatientList(): Promise<Patient[]> {
        return fetch('http://localhost:3007/api/patients/list')
            .then(response => response.json())
            .then(data => data.map((data: any) => new Patient(data)))
            .catch(error => {
                console.error('Error fetching patients:', error);
                return [];
            });
    }
}