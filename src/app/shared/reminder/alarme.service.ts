import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alarme } from 'src/app/shared/reminder/alarme.model';
import { Repetition } from 'src/app/shared/reminder/repetition.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlarmeService {
  url = environment.api;
  constructor(private http: HttpClient) {}

  getRepetitions(): Observable<Repetition[]> {
    return this.http
      .get<any>(this.url + 'reps')
      .pipe(map((res) => res.data as Repetition[]));
  }
  getAlarms(): Observable<Alarme[]> {
    return this.http
      .get<any>(this.url + 'alarms')
      .pipe(map((res) => res.data as Alarme[]));
  }
}
