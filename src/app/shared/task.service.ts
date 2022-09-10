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
    let espace = 'ES1';
    return this.http
      .get<any>(this.url + 'tasks/' + espace)
      .pipe(map((res) => res.data as Task[]));
  }
  updateTask(taskId: string, task: Task): Observable<any> {
    let query = this.url + 'task/' + taskId;
    console.log('put');
    return this.http.put(query, task);
  }
  getTaskDetail(id: string): Observable<Task> {
    return this.http
      .get<any>(this.url + 'task/' + id)
      .pipe(map((res) => res.data[0] as Task));
  }
  updateTaskDetail(task: Task): Observable<any> {
    console.log('service**********', task);
    let query = this.url + 'taskDetail/' + task.ID_TACHE;
    return this.http.put(query, task);
  }
}
