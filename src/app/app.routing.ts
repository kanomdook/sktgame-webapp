import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';
import { PeopleComponent } from './people/people.component';
import { AuthGuardService } from './providers/auth-guard/auth-guard.service';
import { RegisterSportComponent } from './register-sport/register-sport.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'report',
        component: ReportComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'people',
        component: PeopleComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'registersport',
        component: RegisterSportComponent,
        canActivate: [AuthGuardService]
    }
];
