import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../shared/authentification.service';
import { NavbarService } from '../shared/navbar.service';

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
  socket: any;
  espace: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthentificationService,
    private route: Router,
    private navbarservice: NavbarService
  ) {}

  ngOnInit(): void {
    this.navbarservice.hide();
  }
  authenticate() {
    this.isLoading = true;
    sessionStorage.setItem('espace', this.espace);
    this.authService.signIn(this.pseudo, this.pwd).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.data);
        this.isLoading = false;

        this.route.navigate(['/espace']);
      },
      (err) => {
        this.erreur = err.error.message;
        this.isLoading = false;
      }
    );
  }
}
