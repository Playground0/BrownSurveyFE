import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicFormDetails } from '../../models/UIModels/BasicFormDetails.model'; 
import { PublicApiService } from '../../services/public-api.service';
import { Observable, tap } from 'rxjs';
import * as FormConstants from '../../../shared/Constants/Form.constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  
  allForms: BasicFormDetails[] = [];
  listOfSurvey$!: Observable<BasicFormDetails[]>;
  listOfQuizzes$!: Observable<BasicFormDetails[]>;
  listOfOpinions$!: Observable<BasicFormDetails[]>;
  surveyListLength : number = 0;
  quizListLength : number = 0;
  opinionListLength : number = 0;
 
  constructor(private router:Router,private apiService: PublicApiService){}
  ngOnInit(): void {
    this.getAllForms();
  }
  createForm(formType: string){
    this.router.navigateByUrl(`/create/${formType}`);
  }
  getAllForms(){
    this.listOfSurvey$ = this.apiService.getAllFormByType(FormConstants.Survey).pipe(tap(forms => this.surveyListLength = forms.length));
    this.listOfQuizzes$ = this.apiService.getAllFormByType(FormConstants.Quiz).pipe(tap(forms => this.quizListLength = forms.length));
    this.listOfOpinions$ = this.apiService.getAllFormByType(FormConstants.Opinion).pipe(tap(forms => this.opinionListLength = forms.length));
  }
  nextTrending(){
    console.log("I'm here")
  }
}
