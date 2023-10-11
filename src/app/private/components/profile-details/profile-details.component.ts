import { Component, OnInit } from '@angular/core';
import { PrivateApiService } from '../../Services/private-api.service';
import { UserDetails } from '../../models/UserDetails';
import { Observable, map, startWith, switchMap, tap } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  userDetails$!: Observable<UserDetails>;
  localData : any;
  userDetailsForm!: FormGroup;
  userID: string = "";
  dataLoaded: boolean = false;

  constructor(private apiSerice: PrivateApiService,private loginService: LoginService, private fb: FormBuilder){}
  ngOnInit(): void {
    this.userDetailsForm = this.initializeForm();
    this.localData = this.loginService.getLocalData("authData").Response;
    this.userID = this.localData.id;
    this.initializeFormWithUserValues();
  }
  initializeForm() : FormGroup{
      return this.fb.group({
        "username": new FormControl('',Validators.required),
        "fullname": new FormControl(''),
        "email": new FormControl('',Validators.required),
        "phonenumber": new FormControl(''),
        "location": new FormControl(''),
        "age": new FormControl('')
      });
  }
  initializeFormWithUserValues(){
    this.userDetails$ = this.apiSerice.getUserDetails(this.userID).pipe(tap((res:UserDetails) => {
      this.setFormValue(res);
    }));
  }
  setFormValue(userInfo: UserDetails){
    this.userDetailsForm.get('username')?.setValue(userInfo.username);
    this.userDetailsForm.get('fullname')?.setValue(userInfo.fullname);
    this.userDetailsForm.get('email')?.setValue(userInfo.email);
    this.userDetailsForm.get('phonenumber')?.setValue(userInfo.phonenumber);
    this.userDetailsForm.get('location')?.setValue(userInfo.location);
    this.userDetailsForm.get('age')?.setValue(userInfo.age);
    this.dataLoaded = true;
  }
  saveChanges(){
    this.dataLoaded = false;
    if(this.userDetailsForm.invalid){
      return;
    }
    let userInfo : UserDetails = this.userDetailsForm.value;
    this.apiSerice.updateUserInfo(this.userID,userInfo).subscribe({
      next: (res) => {
        console.log(res);
        this.initializeFormWithUserValues();
        this.dataLoaded = true;
      },
      error: (err) => {
        this.dataLoaded = true;
      }
    });
  }

}
