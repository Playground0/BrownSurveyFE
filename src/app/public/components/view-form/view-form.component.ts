import { Component,OnInit,Inject,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicApiService } from '../../services/public-api.service';
import { Form } from '../../models/saveForm.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormQuestions } from '../../models/UIModels/CustomForm.model';
import * as AdminConstants from '../../../shared/Constants/AdminConfiguration.constants';
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {

  formDetails: Form | undefined | null = null;
  loader : boolean = false;
  responseDetails!:FormGroup;
  questions: FormQuestions[] = [];
  preview:boolean = true;
  @Input() dataFromDialog!: Form;
  AdminConstants = AdminConstants;
  scaleBox : number[] = [1,2,3,4,5,6,7,8,9,10];
  submitForm!:FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private apiService : PublicApiService, private fb: FormBuilder) 
  {}

  ngOnInit(): void {
    this.getInfoFromUrl();
  }
  getInfoFromUrl(){
    this.activatedRoute.params.subscribe((param) => {
      let id = param['id'];
      id ? this.getFormDetails(id) : this.loadData(this.dataFromDialog,true);
      this.submitForm = this.initializeSubmitForm();
      this.responseDetails = this.initializeResponseForm();
    });
  }
  initializeSubmitForm() : FormGroup{
    return this.fb.group({});
  }
  initializeResponseForm() : FormGroup{
    return this.fb.group({
      asAnnonymous: new FormControl(false,Validators.required),
      name:new FormControl(''),
      email:new FormControl(''),
      age:new FormControl(''),
      location:new FormControl('')
    });
  }
  getFormDetails(id:string){
    this.loader = true;
    if(!id){
      return;
    }
    this.apiService.getFormDetails(id).subscribe({
      next: (res:Form) => {
        this.loadData(res,false);
      },
      error: (err) => {
        this.loader = false;
        this.formDetails = null;
        console.log(err);
      }
    })
  }
  loadData(data: Form, isPreview: boolean){
    this.formDetails = data;
    this.questions = this.formDetails.formQuestions;
    this.loader= false;
    this.preview = isPreview;
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000)+"%";
    }

    return `${value}`;
  }
  submitResponse(){

  }
}
