import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component'; 
import { CreateFormComponent } from './components/create-form/create-form.component'; 
import { FormOverviewComponent } from './components/form-overview/form-overview.component'; 
import { ViewFormComponent } from './components/view-form/view-form.component'; 
import { LoginComponent } from './components/login/login.component'; 
import { AboutUsComponent } from './components/about-us/about-us.component'; 
import { SubscribePlanComponent } from './components/subscribe-plan/subscribe-plan.component';
import { FormListComponent } from './components/form-list/form-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    HomePageComponent,
    LoginComponent,
    CreateFormComponent,
    ViewFormComponent,
    AboutUsComponent,
    SubscribePlanComponent,
    FormOverviewComponent,
    FormListComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
    
  ],
  providers:[DatePipe,{provide:MAT_DIALOG_DATA, useValue:{formData: {}}}]
})
export class PublicModule { }
