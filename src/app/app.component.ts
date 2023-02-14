import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  //First changes to dev branch
  
  title = 'Brownsurvey';

  constructor()
  {

  }
  ngOnInit()
  {
    this.title = "Test"
  }
  
}
