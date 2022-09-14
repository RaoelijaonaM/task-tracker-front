import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../authentification/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private http: HttpClient) {}
  signIn(login: string, pwd: string): Observable<User> {
    let body = {
      login: login,
      password: pwd,
    };
    let url = environment.api + 'user/login';
    return this.http.post<User>(url, body);
  }
}
