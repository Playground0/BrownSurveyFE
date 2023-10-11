import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';

import { ProfilePageComponent } from './components/profile-page/profile-page.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component'; 
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { DraftedFormsComponent } from './components/drafted-forms/drafted-forms.component'; 
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProfilePageComponent,
    DashboardComponent,
    ProfileDetailsComponent,
    DraftedFormsComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule 
  ],
  providers: [{provide:MAT_DIALOG_DATA, useValue:{formId: "", formName: "", modalType:""}}]
})
export class PrivateModule { }
