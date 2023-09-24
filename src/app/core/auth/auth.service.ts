import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser!: BehaviorSubject<any>;
  constructor() { }
  
}
