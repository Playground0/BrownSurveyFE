import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicCommonService } from '../../services/public-common.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit{

  formType : string = '';
  customForm! : FormGroup;
  formLimit: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private publicCommonService: PublicCommonService, private fb:FormBuilder){}


  ngOnInit(): void {
    this.getFormTypeFromUrl();
  }
  initializeForm(){
    this.customForm = this.fb.group({
      category : new FormControl('',Validators.required),
      title: new FormControl('',Validators.required),
      forms : this.fb.array([])
    });
    this.addForm();
  }
  getFormTypeFromUrl(){
    this.activatedRoute.params.subscribe((param) => {
      this.initializeForm();
      let urlKey = param['formType'];
      this.formType = this.publicCommonService.getFormKey(urlKey);
      this.formLimit = this.publicCommonService.getFormLimit(urlKey);
    });
  }
  get forms() {
    return this.customForm.controls['forms'] as FormArray;
  }
  newForm() : FormGroup{
    return this.fb.group({
      question : new FormControl('',Validators.required),
      type: new FormControl('', Validators.required),
      options: new FormControl('')
    });
  }
  addForm(){
    this.forms.push(this.newForm());
  }
  deleteForm(index:number){
    this.forms.removeAt(index);
    this.forms.length === 0 ? this.addForm() : "";
  }
  reviewForm(){
    if(this.customForm.invalid){
      this.customForm.markAllAsTouched();
      return;
    }
  }
}
