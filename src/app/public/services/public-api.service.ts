import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleAuthentication } from '../models/AuthticationResponse.model';
import { Form } from '../models/saveForm.model';
import { BasicFormDetails } from '../models/UIModels/BasicFormDetails.model';
import { AdminConfiguration } from '../models/UIModels/AdminConfiguration';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  localHost : boolean = false;
  apiUrl = this.localHost ? "http://localhost:8080/api" : "https://zany-cyan-puffer-slip.cyclic.app/api";
  constructor(private http: HttpClient) { }

  getAllForms() : Observable<BasicFormDetails[]>{
    return this.http.get<BasicFormDetails[]>(`${this.apiUrl}/forms/getAll`);
  }
  submitForm(form: Form) : Observable<Form>{
    return this.http.post<Form>(`${this.apiUrl}/forms/new`,form);
  }
  checkTitleAuthenticity(title:string) : Observable<TitleAuthentication>{
    return this.http.get<TitleAuthentication>(`${this.apiUrl}/forms/titleAuthentication/${title}`);
  }
  getFormDetails(id:string) : Observable<Form>{
    return this.http.get<Form>(`${this.apiUrl}/forms/${id}`);
  }
  getAdminConfigurations(formType:string,type:string): Observable<AdminConfiguration[]>{
    return this.http.get<AdminConfiguration[]>(`${this.apiUrl}/forms/admin/${formType}/${type}`);
  }
  
}
