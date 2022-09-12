import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as feather from 'feather-icons';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Discussion } from '../discussion/discussion.model';
import { EspaceService } from '../shared/espace.service';
import { TaskService } from '../shared/task.service';
import { getUserViaToken } from '../shared/token.utils';
import { ValidationComponent } from '../validation/validation.component';
import { Task } from './card/task/task.model';
import { Membre } from './membre.model';

@Component({
  selector: 'app-espace',
  templateUrl: './espace.component.html',
  styleUrls: ['./espace.component.css'],
})
export class EspaceComponent implements OnInit, AfterViewInit {
  membre!: Membre[];
  membreAffiche!: Membre[];
  etudiant: Membre = new Membre();
  theme!: string;
  tasks!: Task[];
  taskTodo!: Task[];
  taskProgress!: Task[];
  taskFinished!: Task[];
  userConnected!: [{ id_user: ''; nom: '' }];
  messageList: Discussion[] = [];
  message: string = '';
  socket!: any;
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
    this.getUserConnected();
    this.getTasksList();
    this.getEspaceDetail();
    this.espaceService.getMessage().subscribe((data: any) => {
      this.messageList = data.data;
    });
  }
  getUserConnected() {
    let userSign = getUserViaToken();
    this.socket = io.io(
      `${environment.socket}?id_user=${userSign.ID_UTILISATEUR}&nom=${
        userSign.NOM + ' ' + userSign.PRENOM
      }`
    );
    this.socket.on('user-connected', (userConnected: any) => {
      this.userConnected = userConnected;
    });

    this.socket.on(
      'message-broadcast',
      (data: { message: string; nom: string }) => {
        console.log('getting message....');
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
      this.membre = res.data.filter((data: any) => {
        data as Membre;
        return data.ROLE != 'Etudiant';
      });
      this.membreAffiche = this.membre.filter((data: any) => {
        data as Membre;
        return data.ROLE != 'Anonyme';
      });
      let etudArray = res.data.filter((data: any) => {
        data as Membre;
        return data.ROLE == 'Etudiant';
      });
      this.etudiant = etudArray[0];
      this.theme = res.data[0].THEME;
    });
  }
  getTasksList() {
    this.taskService.getTasks().subscribe((data) => {
      this.taskTodo = data.filter((res) => {
        res as Task;
        return res.STATUS === 0;
      });
      this.taskProgress = data.filter((res) => {
        res as Task;
        return res.STATUS === 10;
      });
      this.taskFinished = data.filter((res) => {
        res as Task;
        return res.STATUS === 1;
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
  drop(event: CdkDragDrop<Task[]>) {
    const dialogRef = this.dialog.open(ValidationComponent, {
      width: '500px',
      data: { title: 'Validation', message: 'Etes-vous sûr de votre choix?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.status == 1) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.updateStatus(
          event.container.id,
          event.container.data[event.currentIndex]
        );
      }
    });
  }
  sendMessage() {
    let userSign = getUserViaToken();
    this.socket.emit('message', this.message);
    let discussion = new Discussion();
    discussion.MESSAGE = this.message;
    discussion.NOM = userSign.NOM;
    discussion.DATE_DISCUSSION = new Date();
    discussion.ID_ESPACE = 'ES1';
    discussion.ROLE = '';
    console.log(discussion);
    this.espaceService.insertMessage(discussion).subscribe((data: any) => {
      this.messageList.push(discussion);
    });
    this.message = '';
  }
  disconnect() {
    this.socket.disconnect();
    this.espaceService.disconnect();
  }
}
