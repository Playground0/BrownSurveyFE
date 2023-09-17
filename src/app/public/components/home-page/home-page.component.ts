import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicFormDetails } from '../../models/UIModels/BasicFormDetails.model'; 
import { PublicApiService } from '../../services/public-api.service';
import { Observable, tap } from 'rxjs';
import * as FormConstants from '../../../shared/Constants/Form.constants';
import { ContributorList } from '../../models/ContributorsList';

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
  trendingForm$!: Observable<BasicFormDetails>;
  contributorsList$!: Observable<ContributorList[]>;
  currContributor : number = 0;
  surveyListLength : number = 0;
  quizListLength : number = 0;
  opinionListLength : number = 0;
 
  constructor(private router:Router,private apiService: PublicApiService){}
  ngOnInit(): void {
    this.getAllForms();
    this.getContributorsList();
  }
  createForm(formType: string){
    this.router.navigateByUrl(`/create/${formType}`);
  }
  getAllForms(){
    this.listOfSurvey$ = this.apiService.getAllFormByType(FormConstants.Survey).pipe(tap(forms => this.surveyListLength = forms.length));
    this.listOfQuizzes$ = this.apiService.getAllFormByType(FormConstants.Quiz).pipe(tap(forms => this.quizListLength = forms.length));
    this.listOfOpinions$ = this.apiService.getAllFormByType(FormConstants.Opinion).pipe(tap(forms => this.opinionListLength = forms.length));
    this.trendingForm$ = this.apiService.getTrendingForm();
  }
  showTrending(form: BasicFormDetails){
    this.router.navigateByUrl(`view-form/${form.Id}`);
  }
  getContributorsList(){
     this.contributorsList$ = this.apiService.getContributorsList();
  }
  nextContributor(){
    this.currContributor += 1;
  }
  prevContributor(){
    this.currContributor -= 1;
  }
}
