import { Routes } from '@angular/router';
import { Dle } from './goble/primary/dle/dle';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dle',
        pathMatch: 'full'
    },
    {
        path: 'dle',
        component: Dle
    },
    {
        path: '**',
        redirectTo: 'dle'
    }
];
