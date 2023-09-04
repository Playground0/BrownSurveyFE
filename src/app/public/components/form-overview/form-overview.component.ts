import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form } from '../../models/saveForm.model';
import { PublicApiService } from '../../services/public-api.service';
import * as AdminConfigurationConstants from '../../../shared/Constants/AdminConfiguration.constants';
import { Observable } from 'rxjs';
import { AdminConfiguration } from '../../models/UIModels/AdminConfiguration';
@Component({
  selector: 'app-form-overview',
  templateUrl: './form-overview.component.html',
  styleUrls: ['./form-overview.component.css']
})
export class FormOverviewComponent implements OnInit{

  submitForm!: FormGroup;
  statusDropDown$!: Observable<AdminConfiguration[]>;
  submitLoader: boolean = false;
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:{formData: Form}, private apiService: PublicApiService,
  public dialogRef: MatDialogRef<FormOverviewComponent>){}

  ngOnInit(): void {
    this.submitForm = this.initializeForm();
    this.getStatusValues();
  }
  initializeForm() : FormGroup{
    return this.fb.group({
      status: new FormControl('',Validators.required),
      email: new FormControl(''),
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
    submitForm.formStatus = formValue.status;

    console.log(submitForm);
    this.apiService.submitForm(submitForm).subscribe({
      next: (res:any) => {
        if(res){
          this.submitLoader = false;
          this.dialogRef.close({id:res._id});
          console.log("Form Created");
        }
      },
      error: (err) => {
        this.submitLoader = false;
        console.log(err);
      }
     });
  }
  getStatusValues(){
    this.statusDropDown$ = this.apiService.getAdminConfigurations(this.data.formData.formType,AdminConfigurationConstants.Status);
  }
}
