import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  butonActif=false;
 ngOnInit(): void {
   console.log("apres affichage");
   setTimeout(()=>{
    console.log("3 seconds se sont écoulées");
    this.butonActif=true;
   },3000)
 }
 assignmentSelectionne?:Assignment;
 titre = "Assignments app!";
 nomAssignment = "";
 dateRendu?:Date;
 rendu:boolean=true;
 assignments:Assignment[] = [
  {
    nom:"Devoir Angular Mr Buffa",
    dateRendu : new Date("2022-01-10"),
    rendu: false
  },
  {
    nom:"Devoir Grails Mr Galli",
    dateRendu : new Date("2022-12-10"),
    rendu: true
  },
  {
    nom:"Devoir IOS Mr Amosse",
    dateRendu : new Date("2022-10-10"),
    rendu: true
  }
 ];
 onSubmit(){
  if(!this.nomAssignment || !this.dateRendu ) {return;}
  console.log(this.nomAssignment + "" + this.dateRendu);
  let assignment = new Assignment();
  assignment.nom =this.nomAssignment;
  assignment.dateRendu = this.dateRendu;
  assignment.rendu=false;
  this.assignments.push(assignment);
 }
 assignmentClicked(a:Assignment){
  this.assignmentSelectionne=a;
  console.log("You clicked "+a.nom);
 }

}
