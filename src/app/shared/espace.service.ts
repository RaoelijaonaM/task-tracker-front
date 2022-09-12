import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Discussion } from '../discussion/discussion.model';
import { Membre } from '../espace/membre.model';
@Injectable({
  providedIn: 'root',
})
export class EspaceService {
  constructor(private http: HttpClient, private router: Router) {}
  getDetails(): Observable<Membre[]> {
    let id_space = 'ES1';
    let url = environment.api + '/space/' + id_space;
    return this.http.get<Membre[]>(url);
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
    let id_space = 'ES1';
    let url = environment.api + 'messages/' + id_space;
    return this.http.get<Discussion[]>(url);
  }
}
