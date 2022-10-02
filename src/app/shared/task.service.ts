import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../espace/card/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = environment.api;
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    let espace = sessionStorage.getItem('espace');
    return this.http
      .get<any>(this.url + 'tasks/' + espace)
      .pipe(map((res) => res.data as Task[]));
  }
  getTasksEspace(idespace:string): Observable<Task[]> {
       return this.http
      .get<any>(this.url + 'tasks/' + idespace)
      .pipe(map((res) => res.data as Task[]));
  }
  updateTask(taskId: string, task: Task): Observable<any> {
    let query = this.url + 'task/' + taskId;
    console.log('put');
    return this.http.put(query, task);
  }
  getTaskDetail(id: string): Observable<Task[]> {
    return this.http
      .get<any>(this.url + 'task/' + id)
      .pipe(map((res) => res.data as Task[]));
  }
  updateTaskDetail(task: Task): Observable<any> {
    console.log('service**********', task);
    task.DATE_FIN.setDate(task.DATE_FIN.getDate() + 1);
    let query = this.url + 'taskDetail/' + task.ID_TACHE;
    return this.http.put(query, task);
  }
  getTaskDefaut(): Observable<any> {
    return this.http.get<any>(this.url + 'taskDs');
  }
}
