import { Component, Input, OnInit } from '@angular/core';
import { BasicFormDetails } from '../../models/UIModels/BasicFormDetails.model';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit  {

  @Input() list$! : Observable<BasicFormDetails[]>;
  isFormLoaded: boolean = false;
  constructor(private router: Router){}
  ngOnInit(): void {
    this.list$.pipe(map((res : BasicFormDetails[]) => {
      if(res.length){
        this.isFormLoaded = true;
      }
      return res;
    }))
  }
  navigateToForm(form:BasicFormDetails){
    this.router.navigateByUrl(`view-form/${form.Id}`);
  }
}
