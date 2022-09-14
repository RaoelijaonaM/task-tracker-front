import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(private http: HttpClient) {}
  url: string = environment.api;
  addPushSubscriber(sub: any) {
    let url = environment.api + 'notifications';
    console.log(url);
    return this.http.post(environment.api + 'notifications', sub);
  }

  send() {
    return this.http.post(environment.api + 'newsletter', null);
  }
}
