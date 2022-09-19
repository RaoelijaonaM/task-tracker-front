import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File } from '../file/file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}
  insertFile(file: File): Observable<any> {
    let url = environment.api + 'task/file';
    return this.http.post<any>(url, file);
  }
  getAllFiles(idtask: string): Observable<any> {
    let url = environment.api + 'files/' + idtask;
    return this.http.get<any>(url);
  }
}
