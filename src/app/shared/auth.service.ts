import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router:Router) {}
  loggedIn = false;
  logIn() {
    this.loggedIn = true;
  }
  logOut() {

    this.loggedIn = false;
    this.router.navigate(['/home']);
  }



  // on suppose que l'utilisateur est admin si il est connecté
  isAdmin() {
    return new Promise( (resolve, reject) => {
      resolve(this.loggedIn);
    });
  }
}
