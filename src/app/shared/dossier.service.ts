import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DossierService {
  constructor(private http: HttpClient) {}

  getDossier(): Observable<any> {
    let url = environment.api + 'files';
    return this.http.get<any>(url);
  }
}
