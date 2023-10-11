import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, AfterViewChecked{

  currUrl = "";
  constructor(private activatedRoute : ActivatedRoute){}
  ngOnInit(): void {
  }
  ngAfterViewChecked(): void {
    this.activatedRoute.url.subscribe((url) => {
      this.currUrl = window.location.pathname;
    });
  }
  goTo(route:string){
    
  }

}
