import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicFormDetails } from '../../models/UIModels/BasicFormDetails.model'; 
import { PublicApiService } from '../../services/public-api.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  
  allForms: BasicFormDetails[] = [];
  listOfSurvey: BasicFormDetails[] = [];
  listOfQuizzes: BasicFormDetails[] = [];
  listOfOpinions: BasicFormDetails[] = [];
 
  constructor(private router:Router,private apiService: PublicApiService){}
  ngOnInit(): void {
    this.getAllForms();
  }
  createForm(formType: string){
    this.router.navigateByUrl(`/create/${formType}`);
  }
  getAllForms(){
    this.apiService.getAllForms().subscribe({
      next: (res: BasicFormDetails[]) => {
        this.allForms = res;
        this.filterForms();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  filterForms(){
    this.listOfSurvey = this.allForms.filter((ele) => ele.formType === "Survey");
    this.listOfQuizzes = this.allForms.filter((ele) => ele.formType === "Quiz");
    this.listOfOpinions = this.allForms.filter((ele) => ele.formType === "Opinion");
  }
  nextTrending(){
    console.log("I'm here")
  }
}
