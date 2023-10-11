import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form } from '../../models/saveForm.model';
import { PublicApiService } from '../../services/public-api.service';
import * as AdminConfigurationConstants from '../../../shared/Constants/AdminConfiguration.constants';
import { Observable } from 'rxjs';
import { AdminConfiguration } from '../../models/UIModels/AdminConfiguration';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-overview',
  templateUrl: './form-overview.component.html',
  styleUrls: ['./form-overview.component.css']
})
export class FormOverviewComponent implements OnInit{

  submitForm!: FormGroup;
  statusDropDown$!: Observable<AdminConfiguration[]>;
  submitLoader: boolean = false;
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:{formData: Form, isDraft: boolean}, private apiService: PublicApiService,
  public dialogRef: MatDialogRef<FormOverviewComponent>, private router:Router){}

  ngOnInit(): void {
    this.submitForm = this.initializeForm();
    this.getStatusValues();
  }
  initializeForm() : FormGroup{
    return this.fb.group({
      status: new FormControl('',Validators.required),
      email: new FormControl('',Validators.email),
      recieveUpdates: new FormControl(''),
      targetAudience: new FormControl('')
    });
  }
  submitSurvey(){
    if(this.submitForm.invalid){
      return;
    }
    this.submitLoader = true;
    let formValue = this.submitForm.value;
    let submitForm: Form = this.data.formData;
    let isDraft = this.data.isDraft;
    submitForm.formStatus = formValue.status;
    console.log(submitForm);
    if(isDraft){
      this.updateFormDetails(submitForm)
      return;
    }
    this.apiService.submitForm(submitForm).subscribe({
      next: (res:any) => {
        if(res){
          this.submitLoader = false;
          this.dialogRef.close({id:res._id});
        }
      },
      error: (err) => {
        this.submitLoader = false;
        console.log(err);
      }
     });
  }
  updateFormDetails(submitForm: Form){
    if(submitForm.Id){
      this.apiService.updateFormDetails(submitForm.Id,submitForm).subscribe({
        next: (res) => {
          if(res){
            console.log(res);
            this.submitLoader = false;
            this.sendToRoute(submitForm.formStatus)
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    return;
  }
  sendToRoute(status: string){
    this.dialogRef.close({});
    if(status === 'Public'){
      this.router.navigateByUrl('/');
      return;
    }
    if(status === 'Private'){
      this.router.navigateByUrl('/profile');
    }
    if(status === 'Draft'){
      this.router.navigateByUrl('/profile/drafted-forms');
    }
  }
  getStatusValues(){
    this.statusDropDown$ = this.apiService.getAdminConfigurations(this.data.formData.formType,AdminConfigurationConstants.Status);
  }
  goBackToForm(){
    this.dialogRef.close();
  }
}
