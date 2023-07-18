import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicCommonService } from '../../services/public-common.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit{

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private publicCommonService: PublicCommonService){}
  formType : string = '';
  forms : any[] = [];
  ngOnInit(): void {
    for(let i = 0; i<5;i++){
      this.forms.push(i);
    }
    this.getFormTypeFromUrl();
  }
  getFormTypeFromUrl(){
    this.activatedRoute.params.subscribe((param) => {
      let urlKey = param['formType'];
      this.formType = this.publicCommonService.getFormKey(urlKey);
    })
  }
}
