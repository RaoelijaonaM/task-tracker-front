import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Discussion } from '../discussion/discussion.model';
import { Executeur } from '../espace/card/task/executeur.model';
import { Task } from '../espace/card/task/task.model';
import { TaskMember } from '../espace/card/task/taskMember.model';
import { Membre } from '../espace/membre.model';
@Injectable({
  providedIn: 'root',
})
export class EspaceService {
  constructor(private http: HttpClient, private router: Router) {}
  getDetails(): Observable<Membre[]> {
    let id_space = sessionStorage.getItem('espace');
    let url = environment.api + '/space/' + id_space;
    return this.http.get<Membre[]>(url);
  }
  getMembers(id_space: string): Observable<any> {
    let url = environment.api + '/members/' + id_space;
    return this.http.get<any>(url);
  }
  disconnect() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  insertMessage(discussion: Discussion): Observable<any> {
    let url = environment.api + 'message/';
    return this.http.post<Discussion>(url, discussion);
  }
  getMessage(): Observable<Discussion[]> {
    let id_space = sessionStorage.getItem('espace');
    let url = environment.api + 'messages/' + id_space;
    return this.http.get<Discussion[]>(url);
  }
  getNotif(): Observable<any> {
    let url = environment.api + 'notifs/';
    return this.http.get<any>(url);
  }
  getEtudiantEspace(iduser: string): Observable<any> {
    let url = environment.api + 'espace/' + iduser;
    return this.http.get<any>(url);
  }
  getAllEspace(): Observable<any> {
    let url = environment.api + 'espaces/';
    return this.http.get<any>(url);
  }
  getSoutenanceCalendar() {
    let today = new Date();
    let url = environment.api + 'soutweek/' + today;
    return this.http.get<any>(url);
  }
  /**************CREATION ESPACE***************************/
  getTheseWithoutSpace(): Observable<any> {
    let url = environment.api + 'theseLibre/';
    return this.http.get<any>(url);
  }
  getAllUsers(): Observable<any> {
    let url = environment.api + 'users';
    return this.http.get<any>(url);
  }
  getAllProfSoutenance(annee: number): Observable<any> {
    let url = environment.api + 'profs/' + annee;
    return this.http.get<any>(url);
  }
  insertEspace(
    id_these: number,
    membre: Membre[],
    tache: Task[]
  ): Observable<any> {
    tache.forEach((element: Task) => {
      element.DATE_FIN.setDate(element.DATE_FIN.getDate() + 1);
      element.DATE_DEBUT.setDate(element.DATE_DEBUT.getDate() + 1);
    });
    var body = { id_these: 0, membres: '', taches: '' };
    body.id_these = id_these;
    body.membres = JSON.stringify(membre);
    body.taches = JSON.stringify(tache);
    let url = environment.api + 'creer';
    return this.http.post<any>(url, body);
  }
  getTaskOflast(idespace: string): Observable<any> {
    let url = environment.api + 'lasttasks/' + idespace;
    return this.http.get<any>(url);
  }
  insertResponsable(resps: TaskMember[]): Observable<any> {
    let body: any[] = [];
    resps.forEach((element: TaskMember) => {
      element.executeur.forEach((ex: Executeur) => {
        body.push({
          ID_UTILISATEUR: ex.ID_UTILISATEUR,
          ID_TACHE: element.tache.ID_TACHE,
          PRIORITE: ex.PRIORITE,
        });
      });
    });
    console.log('body: ', body);
    let url = environment.api + 'ajoutResponsable';
    return this.http.post<any>(url, body);
  }
  sendMailto(membre: string): Observable<any> {
    let body: any = {
      email: membre,
    };
    let url = environment.api + 'sendmail';
    return this.http.post<any>(url, body);
  }
}
