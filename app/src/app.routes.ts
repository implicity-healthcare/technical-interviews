import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { PatientListPage } from './app/pages/patients/patients';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'patients', component: PatientListPage },
        ]
    },
    { path: '**', redirectTo: '/patients' }
];
