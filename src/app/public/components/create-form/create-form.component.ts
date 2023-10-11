import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicCommonService } from '../../services/public-common.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { PublicApiService } from '../../services/public-api.service';
import { TitleAuthentication } from '../../models/AuthticationResponse.model';
import { CustomForm, FormQuestions, QuestionOptions } from '../../models/UIModels/CustomForm.model';
import { Form } from '../../models/saveForm.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdminConfiguration } from '../../models/UIModels/AdminConfiguration';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormOverviewComponent } from '../form-overview/form-overview.component';
import * as AdminConstants from '../../../shared/Constants/AdminConfiguration.constants';
import * as FormConstants from '../../../shared/Constants/Form.constants'
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  formType: string = '';
  formId: string = '';
  customForm!: FormGroup;
  formLimit: number = 0;
  isTitleAMatch: boolean = false;
  isTitleAuthenticating: boolean = false;
  isTitleAuthenticationDone: boolean = false;
  listOfCategories$!: Observable<AdminConfiguration[]>;
  listOfQuestionTypes!: AdminConfiguration[];
  AdminConstants = AdminConstants;
  userId: string = "0";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicCommonService: PublicCommonService,
    private fb: FormBuilder,
    private publicApiService: PublicApiService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userId = this.loginService.getUserID("authData");
    this.getFormTypeFromUrl();
    if(this.formId){
      this.getFormDetails(this.formId)
    }
    this.getFormCategories();
  }
  initializeForm(): FormGroup {
    return this.fb.group({
      category: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      forms: this.fb.array([]),
    });
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
          if (res.Status === 'SUCCED') {
            this.isTitleAuthenticating = false;
            this.isTitleAuthenticationDone = true;
            this.isTitleAMatch = res.Match;
          }
        },
        error: (err) => {
          this.isTitleAuthenticating = false;
          this.isTitleAuthenticationDone = true;
          console.log(err);
        },
      });
    }, 2000);
  }
  getFormTypeFromUrl() {
    this.activatedRoute.params.subscribe((param) => {
      this.customForm = this.initializeForm();
      this.onChangeTitle();
      this.addForm();
      let urlKey : string = param['formType'];
      this.formId = param['formId'];
      this.formType = this.publicCommonService.getFormKey(urlKey.toLocaleLowerCase());
      this.formLimit = this.userId !== '0' ? this.publicCommonService.getFormLimit(urlKey,true) : this.publicCommonService.getFormLimit(urlKey);
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
      options: this.optionFormGroup(),
      showOption: new FormControl(false),
    });
  }
  addForm() {
    this.forms.push(this.newForm());
  }
  deleteForm(index: number) {
    this.forms.removeAt(index);
    this.forms.length === 0 ? this.addForm() : '';
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
    let currentDate: Date = new Date(Date.now());
    let submitForm: Form = {
      userID: this.loginService.getUserID("authData"),
      userName: this.loginService.getUserName("authData"),
      formTitle: formValue.title.trim(),
      formType: this.formType,
      formCategory: formValue.category,
      formStatus: 'true',
      formStage: 'Live',
      formCreationDate: this.datePipe.transform(currentDate, 'MM/dd/yyyy'),
      formExpirydate: this.datePipe.transform(currentDate.setDate(currentDate.getDate() + 7), 'MM/dd/yyyy'),
      formQuestions: this.mapFormQuestions(formValue.forms),
    };
    if(this.formId){
      submitForm.Id = this.formId;
      this.openDialog(submitForm,true);
      return;
    }
    this.openDialog(submitForm,false);
  }
  openDialog(submitForm: Form, isDraft:boolean) {
    const dialogRef = this.dialog.open(FormOverviewComponent, {
      data: { formData: submitForm, isDraft: isDraft },
      height: '80%',
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.id) {
        this.router.navigateByUrl(`/view-form/${result.id}`)
      }
    });
    return;
  }
  getFormCategories() {
    this.listOfCategories$ = this.publicApiService.getAdminConfigurations(
      this.formType,
      AdminConstants.FormCategory
    );
  }
  getQuestionTypes() {
    this.publicApiService.getAdminConfigurations(this.formType, AdminConstants.QuestionTypes).subscribe({
      next: (res: AdminConfiguration[]) => {
        this.listOfQuestionTypes = res;
      }
    });
  }
  checkSelectValue(value: string, index: number) {
    if (value === AdminConstants.TextField || value === AdminConstants.Percentage ||
      value === AdminConstants.Scale || value === AdminConstants.YesNo || value == ''
    ) {
      this.removeValidatorsForOptions(this.forms.at(index));
      this.toggleOptions(this.forms.at(index), false);
      return;
    }
    if (this.formType === FormConstants.Quiz) {
      this.addFunctionalityForQuiz(this.forms.at(index), value);
      return;
    }
    this.checkAndValidatorsForOptions(this.forms.at(index));
    this.toggleOptions(this.forms.at(index), true);
    return;
  }
  toggleOptions(form: AbstractControl, toggleValue: boolean) {
    form.get('showOption')?.setValue(toggleValue);
    form.get('options')?.reset();
  }
  addFunctionalityForQuiz(form: AbstractControl, value: string) {
    if (value === AdminConstants.MultipleChoiceSingle) {
      form.get('answer1')?.addValidators(Validators.required);
    } else {
      form.get('answer1')?.addValidators(Validators.required);
      form.get('answer2')?.addValidators(Validators.required);
    }
    form.updateValueAndValidity();
    this.toggleOptions(form, true);
  }
  optionFormGroup(): FormGroup {
    return this.fb.group({
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
      answer1: new FormControl(''),
      answer2: new FormControl('')
    });
  }
  removeValidatorsForOptions(form: AbstractControl) {
    form.get('options')?.get('option1')?.removeValidators(Validators.required);
    form.get('options')?.get('option1')?.updateValueAndValidity();
    form.get('options')?.get('option2')?.removeValidators(Validators.required);
    form.get('options')?.get('option2')?.updateValueAndValidity();
    form.get('options')?.get('option3')?.removeValidators(Validators.required);
    form.get('options')?.get('option3')?.updateValueAndValidity();
    form.get('options')?.get('option4')?.removeValidators(Validators.required);
    form.get('options')?.get('option4')?.updateValueAndValidity();
    form.updateValueAndValidity();
  }
  checkAndValidatorsForOptions(form: AbstractControl) {
    if (!form.get('options')?.get('option1')?.hasValidator(Validators.required)) {
      form.get('options')?.get('option1')?.addValidators(Validators.required);
    }
    if (!form.get('options')?.get('option2')?.hasValidator(Validators.required)) {
      form.get('options')?.get('option2')?.addValidators(Validators.required);
    }
    if (!form.get('options')?.get('option3')?.hasValidator(Validators.required)) {
      form.get('options')?.get('option3')?.addValidators(Validators.required);
    }
    if (!form.get('options')?.get('option4')?.hasValidator(Validators.required)) {
      form.get('options')?.get('option4')?.addValidators(Validators.required);
    }
  }
  mapFormQuestions(form: FormQuestions[]): FormQuestions[] {
    let returnForm: FormQuestions[] = [];
    returnForm = form.map((ele: FormQuestions) => {
      return {
        question: ele.question.trim(),
        type: ele.type,
        options: this.checkOptionsForNull(ele.options)
      }
    })
    return returnForm;
  }
  checkOptionsForNull(options: QuestionOptions | string): QuestionOptions | string {
    return Object.values(options).every((ele) => ele === "" || ele === null) ? '' : options;
  }
  omit_special_char(event: any) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  getFormDetails(id:string){
    this.publicApiService.getFormDetails(id).subscribe({
      next: (res:Form) => {
        this.assignValuesToForm(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  assignValuesToForm(formDetails:Form){
    this.customForm.get('category')?.setValue(formDetails.formCategory);
    this.customForm.get('title')?.setValue(formDetails.formTitle);
    if(formDetails.formQuestions.length){
      this.forms.removeAt(0);
      let question = formDetails.formQuestions;
      this.assisgnQuestionToFormArray(question);
    }
  }
  assisgnQuestionToFormArray(question: FormQuestions[]){
    question.forEach((e,i) => {
      this.addForm();
      this.forms.at(i).get('question')?.setValue(e.question);
      this.forms.at(i).get('type')?.setValue(e.type);
      if(e.options){
        this.forms.at(i).get('options')?.setValue(e.options);
        this.forms.at(i).get('showOption')?.setValue(true);
      }
      else{
        this.removeValidatorsForOptions(this.forms.at(i));
      }
    })
  }
}
