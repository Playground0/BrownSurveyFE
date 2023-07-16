import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component'; 
import { CreateFormComponent } from './components/create-form/create-form.component'; 
import { FormOverviewComponent } from './components/form-overview/form-overview.component'; 
import { FormConfirmationComponent } from './components/form-confirmation/form-confirmation.component'; 
import { ViewFormComponent } from './components/view-form/view-form.component'; 
import { LoginComponent } from './components/login/login.component'; 
import { AboutUsComponent } from './components/about-us/about-us.component'; 
import { SubscribePlanComponent } from './components/subscribe-plan/subscribe-plan.component';
import { FormListComponent } from './components/form-list/form-list.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HomePageComponent,
    LoginComponent,
    CreateFormComponent,
    ViewFormComponent,
    AboutUsComponent,
    SubscribePlanComponent,
    FormOverviewComponent,
    FormConfirmationComponent,
    FormListComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatIconModule
  ]
})
export class PublicModule { }
