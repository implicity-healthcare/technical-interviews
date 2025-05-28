import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import pagesRoutes from './app/pages/pages.routes';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            ...pagesRoutes
        ]
    },
    { path: '**', redirectTo: '/patients' }
];
