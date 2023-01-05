import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { dataTest } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private http: HttpClient,private loggingService:LoggingService) { }
  // assignments: Assignment[] = [
  //   {
  //     id:1,
  //     nom: 'Devoir Angular de Mr Buffa',
  //     dateDeRendu: new Date('2022-01-10'),
  //     rendu: false,
  //   },
  //   {
  //     id:2,
  //     nom: 'Devoir Grails de Mr Galli',
  //     dateDeRendu: new Date('2022-12-10'),
  //     rendu: true,
  //   },
  //   {
  //     id:3,
  //     nom: 'Devoir IOS de Mr Amosse',
  //     dateDeRendu: new Date('2022-09-15'),
  //     rendu: true,
  //   },
  // ];


  url="http://localhost:8010/api/assignments/";

  getAssignments():Observable<any> {
    // renvoie un objet observable
    return this.http.get<Assignment[]>(this.url);
  }
  getAssignmentsPaginated(page:number,limit:number):Observable<any> {
    // renvoie un objet observable
    return this.http.get<Assignment[]>(this.url+"?page="+page+"&limit="+limit);
  }
  getAssignment(id:number):Observable<any> {
    // renvoie un objet observable
    // return of(this.assignments.find(assignment => assignment.id === id));
    return this.http.get<Assignment>(this.url+id).pipe(map(a=>{a.nom+=" pipe used"; return a;})




    );
  }

  addAssignment(assignment: Assignment):Observable<any> {
    // on génère un id aléatoire
    assignment.id = Math.floor(Math.random()*10000000000000000);
   // this.assignments.push(assignment);
   return this.http.post<Assignment>(this.url,assignment);

  }

  updateAssignment(assignment: Assignment):Observable<any> {
    // rien besoin de faire, pour le moment, on ne fait que modifier
    // rendu à vrai/faux avec la checkbox du composant de detail
    return this.http.put<Assignment>(this.url,assignment);

  }

  deleteAssignment(assignment: Assignment):Observable<any> {

    // const pos = this.assignments.indexOf(assignment);
    // this.assignments.splice(pos, 1);

     this.loggingService.log(assignment.nom, "supprimé !");
      return this.http.delete<string>(this.url+assignment._id);
    // return of("Assignment supprimé !");

  }
  // basic ver
  peuplerBD(){
    dataTest.forEach(assignmentGenere => {
      let a = new Assignment();
      a.nom=assignmentGenere.nom;
      a.dateDeRendu=new Date(assignmentGenere.dateDeRendu);
      a.rendu=assignmentGenere.rendu;
      a.id=assignmentGenere.id;
      this.addAssignment(a).subscribe((response) => {
        console.log(response);
      });
    });
  }
  //forked ver
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    dataTest.forEach((a) => {
      const nouvelAssignment:any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

}
