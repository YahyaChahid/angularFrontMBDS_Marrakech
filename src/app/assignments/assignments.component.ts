import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Application de gestion des assignments';

  boutonActif = false;

  assignmentSelectionne?: Assignment;

  assignments: Assignment[] = [];

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit() {
    console.log('avant affichage du composant !');

    // On demande la liste des assignments au service
    this.assignmentsService.getAssignments()
    .subscribe((assignments) => {
      console.log("Données arrivés !")
      this.assignments = assignments;
    });
    console.log("données demandées");

    /*

    setTimeout(() => {
      console.log("3 secondes se sont écoulées");
      this.boutonActif = true;
    }, 3000);
    */
  }


  onDeleteAssignment() {
    if (!this.assignmentSelectionne) {
      return;
    }

    console.log(
      "Suppression de l'assignment : " + this.assignmentSelectionne.nom
    );

    this.assignmentsService.deleteAssignment(this.assignmentSelectionne)
    .subscribe(message => {
      console.log(message);
    });
  }
}
