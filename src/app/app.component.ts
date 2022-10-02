import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-tracker';
  showNav = true;
  sub!: any;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => this.initialize(event));
  }
  initialize(location: any) {
    if (location.url == '/') {
      this.showNav = false;
    } else {
      this.showNav = true;
    }
  }
  // readonly VAPID_PUBLIC_KEY =
  //   'BFVhWDd8rh153pGzuA3pl6UcqHxn4k9AHHZteWu2SnpHIYI119SraqALVJJrGzaM1d_ceiP5dLqAzmNPV-RkeSg';
  // constructor(
  //   private swPush: SwPush,
  //   private newletterSerivce: NewsletterService
  // ) {}
  // requestSubscription = () => {
  //   console.log('demande de subscription');
  //   if (!this.swPush.isEnabled) {
  //     console.log('Notification is not enabled.');
  //     return;
  //   }
  //   this.swPush
  //     .requestSubscription({
  //       serverPublicKey: this.VAPID_PUBLIC_KEY,
  //     })
  //     .then((sub) => {
  //       console.log(sub);
  //       this.newletterSerivce.addPushSubscriber(sub).subscribe();
  //     })
  //     .catch((err) =>
  //       console.error('Could not subscribe to notifications', err)
  //     );
  // };
  // sendNewsletter() {
  //   this.newletterSerivce.send().subscribe();
  // }
}
