import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';

import { ProfilePageComponent } from './components/profile-page/profile-page.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component'; 
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { DraftedFormsComponent } from './components/drafted-forms/drafted-forms.component'; 


@NgModule({
  declarations: [
    ProfilePageComponent,
    DashboardComponent,
    ProfileDetailsComponent,
    DraftedFormsComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
