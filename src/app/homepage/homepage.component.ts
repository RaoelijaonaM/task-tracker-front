import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EspaceService } from '../shared/espace.service';
import { NavbarService } from '../shared/navbar.service';
import { AdminEspace } from './adminEspace.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  espace: AdminEspace[] = [];
  constructor(
    private espaceService: EspaceService,
    private route: Router,
    private navbarservice: NavbarService
  ) {}

  ngOnInit(): void {
    this.navbarservice.show();
    this.getAllSpaces();
  }
  getEspace(idespace: string) {
    sessionStorage.setItem('espace', idespace);
    this.route.navigate(['/espace']);
  }
  getAllSpaces() {
    this.espaceService.getAllEspace().subscribe((data) => {
      if (data) {
        let self = this;
        data.data.forEach(function (value: any) {
          let esp = new AdminEspace();
          esp.ID_ESPACE = value.ID_ESPACE;
          esp.NOM = value.NOM;
          esp.THEME = value.THEME;
          esp.TODO = value.TODO * 100;
          esp.PROGRESS = value.PROGRESS * 100;
          esp.FINISH = value.FINISH * 100;
          esp.INITIAL = Array.from(esp.NOM)[0];
          self.espace.push(esp);
        });
      }
    });
  }
}
