import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as feather from 'feather-icons';
import * as _ from 'lodash';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Discussion } from '../discussion/discussion.model';
import { EspaceService } from '../shared/espace.service';
import { TaskService } from '../shared/task.service';
import { getUserViaToken } from '../shared/token.utils';
import { ValidationComponent } from '../validation/validation.component';
import { Executeur } from './card/task/executeur.model';
import { Task } from './card/task/task.model';
import { TaskMember } from './card/task/taskMember.model';
import { Espace } from './espace.model';
import { Membre } from './membre.model';
@Component({
  selector: 'app-espace',
  templateUrl: './espace.component.html',
  styleUrls: ['./espace.component.css'],
})
export class EspaceComponent implements OnInit, AfterViewInit {
  membre!: Membre[];
  isAnonym: boolean = false;
  espace: Espace = new Espace();
  membreAffiche!: Membre[];
  userSession!: any;
  tasks!: TaskMember[];
  taskTodo: TaskMember[] = [];
  taskProgress: TaskMember[] = [];
  taskFinished: TaskMember[] = [];
  userConnected!: [{ id_user: ''; nom: ''; room: '' }];
  messageList: Discussion[] = [];
  message: string = '';
  socket!: any;
  notification:number=0;
  constructor(
    private taskService: TaskService,
    private espaceService: EspaceService,
    private dialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    feather.replace();
  }
  ngOnInit(): void {
    console.log('espace connection');
    console.log(this.userSession);
    this.getTasksList();
    this.getEspaceDetail();
    this.espaceService.getMessage().subscribe((data: any) => {
      this.messageList = data.data;
    });
  }
  checkIfUserAnonym() {
    let userSign = getUserViaToken();
    let membreCurrent = this.membre.find(
      (element) => element.ID_UTILISATEUR == userSign.ID_UTILISATEUR
    );
    if (membreCurrent) {
      if (membreCurrent.ROLE == 'Anonyme') {
        return true;
      }
    }
    return false;
  }
  getUserConnected() {
    if (this.isAnonym) {
      return;
    }
    let userSign = getUserViaToken();
    console.log('socket' + environment.socket);
    this.socket = io.io(
      `${environment.socket}?iduser=${userSign.ID_UTILISATEUR}`
    );
    let nom = userSign.NOM + ' ' + userSign.PRENOM;
    let espace = sessionStorage.getItem('espace');
    console.log('espace', espace);
    let data = {
      nom: nom,
      room: espace,
    };
    this.socket.emit('login', data);
    this.socket.on('user-connected', (userConnected: any) => {
      this.userConnected = userConnected;
      if (!this.userConnected) {
        this.espaceService.disconnect();
      }
    });

    this.socket.on(
      'message-broadcast',
      (data: { message: string; nom: string }) => {
        console.log('getting message....', data);
        if (data) {
          let discussion = new Discussion();
          discussion.MESSAGE = data.message;
          discussion.NOM = data.nom;
          this.messageList.push(discussion);
        }
      }
    );
  }
  getEspaceDetail() {
    this.espaceService.getDetails().subscribe((res: any) => {
      this.espace = res.data[0];
    });
    this.espaceService.getMembers().subscribe((res: any) => {
      this.membre = res.data;
      this.isAnonym = this.checkIfUserAnonym();
      this.membreAffiche = this.membre.filter((data: any) => {
        data as Membre;
        return data.ROLE != 'Anonyme';
      });
      this.getUserConnected();
    });
  }
  notified(isa:number){
    console.log("*************notif2: ");
    this.notification += isa;
  }
  getTasksList() {
    this.taskService.getTasks().subscribe((data) => {
      // this.taskTodo = data.filter((res) => {
      //   res as Task;
      //   return res.STATUS === 0;
      // });
      // this.taskProgress = data.filter((res) => {
      //   res as Task;
      //   return res.STATUS === 10;
      // });
      // this.taskFinished = data.filter((res) => {
      //   res as Task;
      //   return res.STATUS === 1;
      // });
      const result = _.groupBy(
        data,
        (tache) =>
          `"${tache.ID_TACHE}+${tache.ID_TACHED}+${tache.ID_ESPACE}+${tache.DATE_DEBUT}+${tache.DATE_FIN}+${tache.STATUS}+${tache.ID_ALARME}+${tache.DESCRIPTION}+${tache.FICHIER}"`
      );
      Object.entries(result).map(([k, v]) => {
        let tache: TaskMember = new TaskMember();
        let t = k.split('+');
        tache.tache = new Task();
        tache.tache.ID_TACHE = t[0].replace('"', '');
        tache.tache.ID_TACHED = t[1];
        tache.tache.ID_ESPACE = t[2];
        tache.tache.DATE_DEBUT = new Date(t[3]);
        tache.tache.DATE_FIN = new Date(t[4]);
        tache.tache.STATUS = parseInt(t[5]);
        tache.tache.ID_ALARME = t[6];
        tache.tache.DESCRIPTION = t[7];
        tache.tache.FICHIER = parseInt(t[8].replace('"', ''));
        v.forEach(function (value) {
          let res: Executeur = new Executeur();
          res.ID_UTILISATEUR = value.ID_UTILISATEUR;
          res.PRIORITE = value.PRIORITE;
          res.ROLE = value.ROLE;
          tache.executeur.push(res);
        });
        if (tache.tache.STATUS === 0) {
          this.taskTodo.push(tache);
        }
        if (tache.tache.STATUS === 10) {
          this.taskProgress.push(tache);
        }
        if (tache.tache.STATUS === 1) {
          this.taskFinished.push(tache);
        }
      });
    });
  }
  updateStatus(identity: string, task: Task) {
    console.log(task);
    if (identity == 'progress') {
      task.STATUS = 10;
    } else if (identity == 'todo') {
      task.STATUS = 0;
    } else {
      task.STATUS = 1;
    }
    this.taskService.updateTask(task.ID_TACHE, task).subscribe();
  }
  drop(event: CdkDragDrop<TaskMember[]>) {
    const dialogRef = this.dialog.open(ValidationComponent, {
      width: '500px',
      data: { title: 'Validation', message: 'Etes-vous sûr de votre choix?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.status == 1) {
        //this.espaceService.getNotif().subscribe();
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.updateStatus(
          event.container.id,
          event.container.data[event.currentIndex].tache
        );
      }
    });
  }
  sendMessage() {
    let userSign = getUserViaToken();
    if (this.message != '') {
      let discussion = new Discussion();
      discussion.MESSAGE = this.message;
      discussion.NOM = userSign.NOM;
      discussion.DATE_DISCUSSION = new Date();
      if (sessionStorage.getItem('espace') != null) {
        discussion.ID_ESPACE = sessionStorage.getItem('espace')!;
      }
      discussion.ROLE = '';
      console.log(discussion);

      this.espaceService.insertMessage(discussion).subscribe((data: any) => {
        this.socket.emit('message', this.message);
        this.message = '';
      });
    }
  }
}
