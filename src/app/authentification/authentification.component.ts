import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../shared/authentification.service';
import { EspaceService } from '../shared/espace.service';
import { NavbarService } from '../shared/navbar.service';
import { getUserViaToken } from '../shared/token.utils';

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
  isLoading: boolean = false;

  constructor(
    private authService: AuthentificationService,
    private route: Router,
    private espaceService: EspaceService,
    private navbarservice: NavbarService
  ) {}

  ngOnInit(): void {
    this.navbarservice.hide();
  }
  authenticate() {
    this.isLoading = true;
    this.authService.signIn(this.pseudo, this.pwd).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.data);
        this.isLoading = false;
        let userSession = getUserViaToken();

        if (userSession.ID_ROLE == 'R1') {
          this.espaceService
            .getEtudiantEspace(userSession.ID_UTILISATEUR)
            .subscribe((data) => {
              console.log(data.data[0]);
              sessionStorage.setItem('espace', data.data[0].ID_ESPACE);
              this.route.navigate(['/espace']);
            });
        } else {
          this.route.navigate(['/home']);
        }
      },
      (err) => {
        this.erreur = err.error.message;
        this.isLoading = false;
      }
    );
  }
}
