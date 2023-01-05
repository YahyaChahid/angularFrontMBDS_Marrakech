import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[] = [
    {
      id:1,
      nom: 'Devoir Angular de Mr Buffa',
      dateDeRendu: new Date('2022-01-10'),
      rendu: false,
    },
    {
      id:2,
      nom: 'Devoir Grails de Mr Galli',
      dateDeRendu: new Date('2022-12-10'),
      rendu: true,
    },
    {
      id:3,
      nom: 'Devoir IOS de Mr Amosse',
      dateDeRendu: new Date('2022-09-15'),
      rendu: true,
    },
  ];

  constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    // renvoie un objet observable
    return of(this.assignments);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    // renvoie un objet observable
    return of(this.assignments.find(assignment => assignment.id === id));
  }

  addAssignment(assignment: Assignment):Observable<string> {
    // on génère un id aléatoire
    assignment.id = Math.floor(Math.random()*10000000000000000);
    this.assignments.push(assignment);
    return of("Assignment ajouté !");
  }

  updateAssignment(assignment: Assignment):Observable<string> {
    // rien besoin de faire, pour le moment, on ne fait que modifier
    // rendu à vrai/faux avec la checkbox du composant de detail
    return of("Assignment modifié !");
  }

  deleteAssignment(assignment: Assignment):Observable<string> {
    const pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.loggingService.log(assignment.nom, "supprimé !");


    return of("Assignment supprimé !");
  }
}
