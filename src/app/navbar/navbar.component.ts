import { Component, Input, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { TaskMember } from '../espace/card/task/taskMember.model';
import { EspaceService } from '../shared/espace.service';
import { NavbarService } from '../shared/navbar.service';
import { AlarmeService } from '../shared/reminder/alarme.service';
import { getUserViaToken } from '../shared/token.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userSession!: any;
  @Input() socket: any;
  @Input() taskList!: TaskMember[];

  constructor(
    private espaceService: EspaceService,
    private taskAlarm: AlarmeService,
    public navservice: NavbarService
  ) {}
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.espaceService.disconnect();
  }

  listMenu: any;

  ngAfterViewInit() {
    feather.replace();
  }

  ngOnInit(): void {
    this.userSession = getUserViaToken();

    this.listMenu = [
      {
        title: 'Espaces',
        url: '/home',
      },
      {
        title: 'Dossiers',
        url: '/dossier',
      },
      {
        title: 'Créer espace',
        url: '/creerespace',
      },
    ];
  }
}
