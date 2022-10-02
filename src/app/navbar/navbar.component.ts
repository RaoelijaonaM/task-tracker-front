import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit, AfterViewInit {
  userSession!: any;
  @Input() socket: any;
  @Input() taskList!: TaskMember[];
  listMenu: any;

  constructor(
    private espaceService: EspaceService,
    private taskAlarm: AlarmeService,
    public navservice: NavbarService
  ) {
    console.log('called constructor');
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.espaceService.disconnect();
  }

  ngAfterViewInit() {
    console.log('after view init');
    feather.replace();
  }

  ngOnInit(): void {
    console.log('init');
    this.userSession = getUserViaToken();
    if (this.userSession) {
      this.listMenu = this.navservice.getMenu(this.userSession);
    }
    // this.listMenu = [
    //   {
    //     title: 'Espaces',
    //     url: '/home',
    //   },
    //   {
    //     title: 'Dossiers',
    //     url: '/dossier',
    //   },
    //   {
    //     title: 'Créer espace',
    //     url: '/creerespace',
    //   },
    // ];
  }
}
