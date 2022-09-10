import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../shared/authentification.service';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  pseudo: string = '';
  pwd: string = '';
  erreur: string = '';
  hide: boolean = true;
  isLoading: boolean = false;

  constructor(
    private authService: AuthentificationService,
    private route: Router
  ) {}

  ngOnInit(): void {}
  authenticate() {
    this.isLoading = true;
    this.authService.signIn(this.pseudo, this.pwd).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.data);
        this.isLoading = false;
        this.route.navigate(['/espace']);
      },
      (err) => {
        this.erreur = err.error.message;
        this.isLoading = false
      }
    );
  }
}
