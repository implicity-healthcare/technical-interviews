import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Patient } from '../../services/patients/patient.dto';
import { PatientService } from '../../services/patients/patient.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    template: `
        <p-table
            #dt
            [value]="patients()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['name', 'age', 'roomNumber', 'condition']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} patients"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage patients</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="min-width: 16rem">ID</th>
                    <th pSortableColumn="name" style="min-width:16rem">
                        Name
                    </th>
                    <th>Age</th>
                    <th pSortableColumn="roomNumber" style="min-width: 8rem">
                        Room Number
                        <p-sortIcon field="roomNumber" />
                    </th>
                    <th pSortableColumn="condition" style="min-width:10rem">
                        Condition
                        <p-sortIcon field="condition" />
                    </th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-patient>
                <tr>
                    <td style="min-width: 12rem">{{ patient.id }}</td>
                    <td style="min-width: 16rem">{{ patient.name }}</td>
                    <td>{{ patient.age }}</td>
                    <td>{{ patient.roomNumber }}</td>
                    <td>
                        <p-tag [value]="patient.condition" [severity]="patient.condition === 'critical' ? 'danger' : 'info'" />
                    </td>
                    <td>
                        <p-button icon="pi pi-eye" class="mr-2" [rounded]="true" [outlined]="true" (click)="viewPatient(patient)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="patientDialog" [style]="{ width: '450px' }" header="Patient Details" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <input disabled=true type="text" pInputText id="name" [(ngModel)]="patient.name" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !patient.name">Name is required.</small>
                    </div>
                    <div>
                        <label for="age" class="block font-bold mb-3">Age</label>
                        <input disabled=true type="number" pInputText id="age" [(ngModel)]="patient.age" required fluid style="width: 4rem" />
                    </div>
                    <div>
                        <label for="roomNumber" class="block font-bold mb-3">Room Number</label>
                        <input disabled=true type="text" pInputText id="roomNumber" [(ngModel)]="patient.roomNumber" required fluid />
                    </div>
                    <div>
                        <label for="condition" class="block font-bold mb-3">Condition</label>
                        <input disabled=true type="text" pInputText id="condition" [(ngModel)]="patient.condition" required fluid />
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Close" icon="pi pi-times" text (click)="hideDialog()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, PatientService, ConfirmationService]
})

export class PatientListPage implements OnInit {
    patientDialog: boolean = false;

    patients = signal<Patient[]>([]);

    patient!: Patient;


    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private patientService: PatientService,
    ) {}

    ngOnInit() {
        this.loadPatients();
    }

    loadPatients() {
        this.patientService.getPatientList().then((data: Patient[]) => {
            console.log(data);
            this.patients.set(data);
        });

        this.cols = [
            { field: 'id', header: 'ID', customExportHeader: 'patient ID' },
            { field: 'name', header: 'Name' },
            { field: 'age', header: 'Age' },
            { field: 'roomNumber', header: 'Room Number' },
            { field: 'condition', header: 'Condition' },
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    hideDialog() {
        this.patientDialog = false;
        this.submitted = false;
    }

    viewPatient(patient: Patient) {
        this.patient = patient;
        this.patientDialog = true;
    }

    savePatient() {
        this.patientDialog = false;
    }
}
