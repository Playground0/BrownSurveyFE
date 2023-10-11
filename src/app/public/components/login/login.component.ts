import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel, SignUpModel } from '../../models/login';
import { PublicApiService } from '../../services/public-api.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginErrMsg: string = "";
  currentPageTitle: string = "Login";
  toggleLoginPage: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  userRole: number = 0;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private apiService: PublicApiService) { }
  ngOnInit(): void {
    this.getUserRoles();
    this.loginForm = this.initializeForm();
  }
  getUserRoles() {
    this.apiService.getUserRoles().subscribe({
      next: (res: any) => {
        this.userRole = res.Response.User;
      }
    });
  }
  initializeForm() {
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      username: new FormControl(''),
      confirmpassword: new FormControl(''),
      fullname: new FormControl(''),
      phonenumber: new FormControl(''),
      location: new FormControl(''),
      age: new FormControl(''),
      profilePicture: new FormControl('')
    });
  }
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    let loginValue: LoginModel = this.loginForm.value;
    this.loginErrMsg = "";
    this.loginService.login(loginValue).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/profile');
      },
      error: (err) => {
        this.loginErrMsg = err.error.Action_Status;
      }
    });
  }
  onSignUp() {
    if (this.loginForm.invalid) {
      return;
    }
    let loginValue: SignUpModel = this.loginForm.value;
    loginValue.userRole = this.userRole;
    if (loginValue.password !== this.loginForm.value.confirmpassword) {
      this.loginErrMsg = "Password do not match";
      return;
    }
    this.loginService.signUp(loginValue).subscribe({
      next: (res: any) => {
        this.toggleSignUpAndLogin();
      },
      error: (err) => {
        this.loginErrMsg = err.error.Action_Status;
      }
    });
  }
  toggleSignUpAndLogin() {
    // this.loginForm.reset();
    this.loginErrMsg = "";
    this.toggleLoginPage = !this.toggleLoginPage;
    if (!this.toggleLoginPage) {
      this.currentPageTitle = "Login";
      this.addOrRemoveControl(false);
      return;
    }
    this.currentPageTitle = "Sign Up";
    this.addOrRemoveControl(true);
  }
  addOrRemoveControl(addControl: boolean) {
    if (addControl) {
      this.loginForm.get('username')?.addValidators(Validators.required);
      this.loginForm.get('confirmpassword')?.addValidators(Validators.required);
      this.loginForm.updateValueAndValidity();
      return
    }
    if (this.loginForm.get('username')?.hasValidator(Validators.required)) {
      this.loginForm.get('username')?.removeValidators(Validators.required);
      this.loginForm.updateValueAndValidity();
    }
    if (this.loginForm.get('confirmpassword')?.hasValidator(Validators.required)) {
      this.loginForm.get('confirmpassword')?.removeValidators(Validators.required);
      this.loginForm.updateValueAndValidity();
    }
    return;
  }
  togglePasswordVisibility(confirmPassword: boolean): void {
    confirmPassword ? this.showConfirmPassword = !this.showConfirmPassword : this.showPassword = !this.showPassword;
  }
}
