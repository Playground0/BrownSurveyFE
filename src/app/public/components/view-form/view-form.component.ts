import { Component,OnInit,Inject,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicApiService } from '../../services/public-api.service';
import { Form } from '../../models/saveForm.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormQuestions } from '../../models/UIModels/CustomForm.model';
import * as AdminConstants from '../../../shared/Constants/AdminConfiguration.constants';
import { FormAnswerModel } from '../../models/SubmitForm';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {

  formDetails: Form | undefined | null = null;
  formloader : boolean = false;
  formSubmited: boolean = false;
  responseForm!:FormGroup;
  questions: FormQuestions[] = [];
  preview:boolean = true;
  @Input() dataFromDialog!: Form;
  AdminConstants = AdminConstants;
  scaleBox : number[] = [1,2,3,4,5,6,7,8,9,10];
  constructor(private activatedRoute:ActivatedRoute, private apiService : PublicApiService, private fb: FormBuilder, private datePipe: DatePipe) 
  {}

  ngOnInit(): void {
    this.getInfoFromUrl();
  }
  getInfoFromUrl(){
    this.activatedRoute.params.subscribe((param) => {
      this.responseForm = this.initializeResponseForm();
      let id = param['id'];
      id ? this.getFormDetails(id) : this.loadData(this.dataFromDialog,true);
    });
  }
  initializeResponseForm() : FormGroup{
    return this.fb.group({
      questionResponse : new FormArray([]),
      asAnnonymous: new FormControl(false,Validators.required),
      name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      age:new FormControl('',Validators.required),
      location:new FormControl('',Validators.required)
    });
  }
  initializeSubmitForm() : FormArray{
    return this.fb.array([]);
  }
  newQuestionResponse(){
    return this.fb.group({
      question: new FormControl(""),
      type: new FormControl(""),
      options: new FormControl(""),
      answer1: new FormControl(""),
    })
  }
  get questionResponse() : FormArray {
    return this.responseForm.get('questionResponse') as FormArray;
  }
  getFormDetails(id:string){
    this.formloader = true;
    if(!id){
      return;
    }
    this.apiService.getFormDetails(id).subscribe({
      next: (res:Form) => {
        this.loadData(res,false);
      },
      error: (err) => {
        this.formloader = false;
        this.formDetails = null;
       
        console.log(err);
      }
    })
  }
  loadData(data: Form, isPreview: boolean){
    this.formDetails = data;
    this.questions = this.formDetails.formQuestions;
    this.setFormArray(this.questions); 
    this.formloader= false;
    this.preview = isPreview;
  }
  setFormArray(questions: FormQuestions[]){
    questions.forEach((e,i) => {
      this.questionResponse.push(this.newQuestionResponse());
      let currQuestion : FormGroup<any> = <FormGroup> this.questionResponse.at(i);
      currQuestion.get('question')?.setValue(e.question);
      currQuestion.get('type')?.setValue(e.type);
      currQuestion.get('options')?.setValue(e.options);
      e.type === AdminConstants.MultipleChoiceMultiple ? currQuestion.addControl("answer2",this.fb.control('')) : "";
    });
  }
  formatLabel(value: number): string {
    return value >= 1000 ?  Math.round(value / 1000)+"%" : `${value}`; 
  }
  setScaleValue(value:number,index:number){
    this.questionResponse.at(index).get('answer1')?.setValue(value.toString());
  }
  submitResponse(){
    if(this.responseForm.invalid){
      return;
    }
    let formValue = this.responseForm.value;
    let requestBody: FormAnswerModel= this.setRequestBody(formValue);
    this.formSubmited = true;
    this.formloader = true
    this.apiService.submitAnswer(requestBody).subscribe({
      next: (res) => {
        this.formloader = false;
      },
      error: (err) => {
        console.log(err);
        this.formSubmited = false;
        this.formloader = false;
      } 
    });
  }
  setRequestBody(formValue:any) : FormAnswerModel{
    let currentDate: Date = new Date(Date.now());
    let returnValue : FormAnswerModel =  {
      userID: "0",
      userName: "0",
      formId : this.formDetails?.Id ?  this.formDetails?.Id?.toString() : "",
      formTitle: this.formDetails?.formTitle ? this.formDetails?.formTitle : "",
      formCategory: this.formDetails?.formCategory ? this.formDetails?.formCategory : "",
      formType: this.formDetails?.formType ? this.formDetails.formType : "",
      SubmitDate: this.datePipe.transform(currentDate, 'MM/dd/yyyy'),
      formAnswer: formValue.questionResponse,
      name: formValue.asAnnonymous ? "" : formValue.name,
      email: formValue.asAnnonymous ? "" : formValue.email,
      age:formValue.asAnnonymous ? "" : formValue.age,
      location: formValue.asAnnonymous ? "" : formValue.location
    }
    return returnValue;
  }
  checkResponseAnnonymous(){
    let value : boolean = this.responseForm.get('asAnnonymous')?.value;
    if(value){
      this.responseForm.get('name')?.removeValidators(Validators.required);
      this.responseForm.get('name')?.updateValueAndValidity();
      this.responseForm.get('email')?.removeValidators(Validators.required);
      this.responseForm.get('email')?.updateValueAndValidity();
      this.responseForm.get('age')?.removeValidators(Validators.required);
      this.responseForm.get('age')?.updateValueAndValidity();
      this.responseForm.get('location')?.removeValidators(Validators.required);
      this.responseForm.get('location')?.updateValueAndValidity();
      return;
    }
    this.responseForm.get('name')?.addValidators(Validators.required);
    this.responseForm.get('name')?.updateValueAndValidity();
    this.responseForm.get('email')?.addValidators(Validators.required);
    this.responseForm.get('email')?.updateValueAndValidity();
    this.responseForm.get('age')?.addValidators(Validators.required);
    this.responseForm.get('age')?.updateValueAndValidity();
    this.responseForm.get('location')?.addValidators(Validators.required);
    this.responseForm.get('location')?.updateValueAndValidity();
  }
}
