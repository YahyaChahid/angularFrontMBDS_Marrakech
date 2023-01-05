import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService:AuthService,private assignmentService: AssignmentsService,private route:Router) {}
  prof = 'Michel Buffa';
  login(){
    if(this.authService.loggedIn) this.authService.logOut();
    else this.authService.logIn();
  }
  peuplerBD(){
    this.assignmentService.peuplerBDAvecForkJoin().subscribe( (response) => { console.log("BD peuplée");
    this.route.navigate(['/home']);
    });
  }
}
