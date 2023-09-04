import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicApiService } from '../../services/public-api.service';
import { Form } from '../../models/saveForm.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormQuestions } from '../../models/UIModels/CustomForm.model';

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

  constructor(private activatedRoute:ActivatedRoute, private apiService : PublicApiService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      let id = param['id'];
      this.getFormDetails(id);
      this.responseDetails = this.initializeResponseForm();
    });
  }
  initializeResponseForm() : FormGroup{
    return this.fb.group({
      asAnnonymous: new FormControl('',Validators.required),
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
        this.formDetails = res;
        console.log(this.formDetails);
        this.questions = this.formDetails.formQuestions;
        this.loader = false;
      },
      error: (err) => {
        this.loader = false;
        this.formDetails = null;
        console.log(err);
      }
    })
  }
}
