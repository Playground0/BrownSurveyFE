import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component'; 
import { DraftedFormsComponent } from './components/drafted-forms/drafted-forms.component'; 
import { LoginGuard } from '../core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
        children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent,canActivate:[LoginGuard] },
      { path: 'profile-details', component: ProfileDetailsComponent,canActivate:[LoginGuard]},
      { path: 'drafted-forms', component: DraftedFormsComponent,canActivate:[LoginGuard]},
    ],
  },
  { path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
