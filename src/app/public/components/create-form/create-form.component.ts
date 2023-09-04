import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicCommonService } from '../../services/public-common.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicApiService } from '../../services/public-api.service';
import { TitleAuthentication } from '../../models/AuthticationResponse.model';
import { CustomForm, FormQuestions } from '../../models/UIModels/CustomForm.model';
import { Form } from '../../models/saveForm.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdminConfiguration } from '../../models/UIModels/AdminConfiguration';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  formType: string = '';
  customForm!: FormGroup;
  formLimit: number = 0;
  isTitleAMatch: boolean = false;
  isTitleAuthenticating: boolean = false;
  isTitleAuthenticationDone: boolean = false;
  listOfCategories!: Observable<AdminConfiguration[]>;
  listOfQuestionTypes!: Observable<AdminConfiguration[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private publicCommonService: PublicCommonService, 
    private fb: FormBuilder, private publicApiService: PublicApiService, private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.getFormTypeFromUrl();
  }
  initializeForm() {
    this.customForm = this.fb.group({
      category: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      forms: this.fb.array([]),
    });
    this.onChangeTitle();
    this.addForm();
  }
  onChangeTitle() {
    let value: string = this.customForm.get('title')?.value;
    this.isTitleAuthenticationDone = false;
    if (value.length < 5) {
      return;
    }
    this.isTitleAuthenticating = true;
    setTimeout(() => {
      this.publicApiService.checkTitleAuthenticity(value).subscribe({
        next: (res: TitleAuthentication) => {
          if (res.Status === "SUCCED") {
            this.isTitleAuthenticating = false;
            this.isTitleAuthenticationDone = true;
            this.isTitleAMatch = res.Match;
          }
        },
        error: (err) => {
          this.isTitleAuthenticating = false;
          this.isTitleAuthenticationDone = true;
          console.log(err);
        }
      });
    }, 2000)
  }
  getFormTypeFromUrl() {
    this.activatedRoute.params.subscribe((param) => {
      this.initializeForm();
      let urlKey = param['formType'];
      this.formType = this.publicCommonService.getFormKey(urlKey);
      this.formLimit = this.publicCommonService.getFormLimit(urlKey);
      this.getFormCategories();
      this.getQuestionTypes();  
    });
  }
  get forms() {
    return this.customForm.controls['forms'] as FormArray;
  }
  newForm(): FormGroup {
    return this.fb.group({
      question: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      options: new FormControl('')
    });
  }
  addForm() {
    this.forms.push(this.newForm());
  }
  deleteForm(index: number) {
    this.forms.removeAt(index);
    this.forms.length === 0 ? this.addForm() : "";
  }
  reviewForm() {
    if (this.isTitleAMatch) {
      return;
    }
    if (this.customForm.invalid) {
      this.customForm.markAllAsTouched();
      return;
    }
    let formValue: CustomForm = this.customForm.value;
    let currentDate : Date = new Date(Date.now());

    let submitForm: Form = {
      userID: "0",
      userName: "0",
      formTitle: formValue.title,
      formType: this.formType,
      formCategory: formValue.category,
      formStatus: "true",
      formStage: "Live",
      formCreationDate: this.datePipe.transform(currentDate,"MM/dd/yyyy"),
      formExpirydate: this.datePipe.transform(currentDate.setDate(currentDate.getDate() + 7), "MM/dd/yyyy"),
      formQuestions: formValue.forms
    }
    console.log(submitForm);
    this.publicApiService.submitForm(submitForm).subscribe({
      next: (res) => {
        if(res){
          console.log("Form Created");
        }
      },
      error: (err) => {
        console.log(err);
      }
     });
  }
  getFormCategories(){
    this.listOfCategories = this.publicApiService.getAdminConfigurations(this.formType,"Form Category");
  }
  getQuestionTypes(){
    this.listOfQuestionTypes = this.publicApiService.getAdminConfigurations(this.formType,"Question Types");
  }
}
