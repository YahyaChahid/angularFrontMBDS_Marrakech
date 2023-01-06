import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  page: number=1;
  limit: number=10;
  totalDocs: number=0;
  totalPages: number=0;
  hasPrevPage: boolean=false;
  prevPage: number=0;
  hasNextPage: boolean=false;
  nextPage: number=0;
  displayedColumns: string[] = ['name', 'date de rendu', 'rendu'];

  titre = 'Application de gestion des assignments';

  boutonActif = false;

  assignmentSelectionne?: Assignment;

  assignments: Assignment[] = [];

  constructor(private assignmentsService: AssignmentsService) {}


  ngOnInit() {
    // console.log('avant affichage du composant !');

    // // On demande la liste des assignments au service
    // this.assignmentsService.getAssignmentsPaginated(1,10)
    // .subscribe((data) => {
    //   console.log("Données arrivés !")
    //   this.assignments = data.docs;
    // });
    // console.log("données demandées");
    // this.assignmentsService.getAssignmentsPaginated(this.page, this.limit)
    //  .subscribe(data => {
    //    this.assignments = data.docs;
    //    this.page = data.page;
    //    this.limit = data.limit;
    //    this.totalDocs = data.totalDocs;
    //    this.totalPages = data.totalPages;
    //    this.hasPrevPage = data.hasPrevPage;
    //    this.prevPage = data.prevPage;
    //    this.hasNextPage = data.hasNextPage;
    //    this.nextPage = data.nextPage;
    //    console.log("données reçues");
    //  });
    this.getAssignments();
    /*

    setTimeout(() => {
      console.log("3 secondes se sont écoulées");
      this.boutonActif = true;
    }, 3000);
    */
  }
  paginator($event:any){
    console.log($event);
    this.page = $event.pageIndex+1;
    this.limit = $event.pageSize;
    this.getAssignments();

  }

  getAssignments() {
    this.assignmentsService.getAssignmentsPaginated(this.page, this.limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }
  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }
  dernierPage() {
    this.page = this.totalPages;
    this.getAssignments();
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
