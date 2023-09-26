import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContributorList } from '../../models/ContributorsList';
import { PublicApiService } from '../../services/public-api.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  contributorsList$!: Observable<ContributorList[]>;
  currContributor : number = 0;
  constructor(private apiService: PublicApiService){}
  ngOnInit(): void {
    this.getContributorsList();
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
