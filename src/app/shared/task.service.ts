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
  taches$!: Observable<Task[]>;
  url = environment.api;
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    let espace = 'ES1';
    return this.http
      .get<any>(this.url + 'tasks/' + espace)
      .pipe(map((res) => res.data as Task[]));
  }
  updateTask(taskId: string, task: Task): Observable<any> {
    let query = this.url + 'task/' + taskId
    console.log("put");
    return this.http.put(query, task);
  }
}
