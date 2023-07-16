import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  listOfSurvey: any[] = [];
  listOfQuizzes: any[] = [];
  listOfOpinions: any[] = []; 
  ngOnInit(): void {
    this.getListOfSurveys();
    this.getListOfQuizzes();
    this.getListOfOpinions()
  }

  getListOfSurveys(){
    for(let i = 0; i<=12; i++){
      let survey = {
        id: i,
        name: 'New Form Survey ' + i,
        type: 'Survey'
      }
      this.listOfSurvey.push(survey);
    }
  }
  getListOfQuizzes(){
    for(let i = 0; i<=15; i++){
      let survey = {
        id: i,
        name: 'New Form Quiz ' + i,
        type: 'Quiz'
      }
      this.listOfQuizzes.push(survey);
    }
  }
  getListOfOpinions(){
    for(let i = 0; i<=5; i++){
      let survey = {
        id: i,
        name: 'New Form Opinion ' + i,
        type: 'Opinion'
      }
      this.listOfOpinions.push(survey);
    }
  }
  nextTrending(){
    console.log("I'm here")
  }
}
