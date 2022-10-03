import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as feather from 'feather-icons';
import { EspaceService } from 'src/app/shared/espace.service';
import { TaskService } from 'src/app/shared/task.service';
import { getUserViaToken, isAdmin } from 'src/app/shared/token.utils';
import { Executeur } from './executeur.model';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { Task } from './task.model';
import { TaskMember } from './taskMember.model';
export interface DialogData {
  nom: string;
}
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit, AfterViewInit {
  @Input() task: TaskMember = new TaskMember();
  disable: boolean = true;
  disableUpdate: boolean = true;
  alarm: boolean = false;
  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private espaceService: EspaceService
  ) {}

  ngOnInit(): void {
    this.checkTaskIfCanBeDragAndTaskDetailled();
    this.ckeckTaskIfCanBeDetailled();
    this.checkTaskDeadline();
  }
  ngAfterViewInit(): void {
    feather.replace();
  }
  checkTaskIfCanBeDragAndTaskDetailled() {
    let userConnected = getUserViaToken();
    let nomUser = userConnected.NOM + ' ' + userConnected.PRENOM;
    const findMe = this.task.executeur.find((ex) => {
      return ex.ID_UTILISATEUR === nomUser;
    });
    if (findMe || isAdmin()) {
      this.disableUpdate = false;
    }
    if (findMe?.PRIORITE == 1 || isAdmin()) {
      this.disable = false;
    }
  }
  ckeckTaskIfCanBeDetailled() {
    this.task.executeur.forEach(function (value) {
      if (value.ROLE == 'Anonyme') {
        if (isAdmin() == false) {
          value.shown = false;
        }
      }
    });
  }
  checkTaskDeadline() {
    if (this.task.tache.STATUS == 0) {
      let dtTask = new Date(this.task.tache.DATE_FIN);
      dtTask.setHours(0, 0, 0, 0);
      let semaineApres = new Date();
      semaineApres.setHours(0, 0, 0, 0);
      let diff = semaineApres.getTime() - dtTask.getTime();
      let diffDay = diff / (1000 * 60 * 60 * 24);
      console.log(diffDay + 'jours');
      if (diffDay >= 7) {
        this.alarm = true;
        //send mail to all members

        // let membres = this.task.executeur;
        // membres.forEach((element) => {
        //   this.espaceService.sendMailto(element.MAIL).subscribe((data) => {
        //     console.log('data', data);
        //   });
        // });

        this.espaceService
          .sendMailto('raoeladrien@gmail.com')
          .subscribe((data) => {
            console.log('data', data);
          });
      } else {
        this.alarm = false;
      }
    } else {
      this.alarm = false;
    }
  }
  openDetail() {
    this.taskService
      .getTaskDetail(this.task.tache.ID_TACHE)
      .subscribe((data: Task[]) => {
        let taskm: TaskMember = new TaskMember();
        taskm.tache = new Task();
        taskm.tache.ID_TACHE = data[0].ID_TACHE;
        taskm.tache.ID_TACHED = data[0].ID_TACHED;
        taskm.tache.ID_ESPACE = data[0].ID_ESPACE;
        taskm.tache.DATE_DEBUT = data[0].DATE_DEBUT;
        taskm.tache.DATE_FIN = data[0].DATE_FIN;
        taskm.tache.STATUS = data[0].STATUS;
        taskm.tache.ID_ALARME = data[0].ID_ALARME;
        taskm.tache.DESCRIPTION = data[0].DESCRIPTION;
        taskm.tache.FICHIER = data[0].FICHIER;
        data.forEach(function (value) {
          let resp: Executeur = new Executeur();
          resp.ID_UTILISATEUR = value.ID_UTILISATEUR;
          resp.PRIORITE = value.PRIORITE;
          resp.ROLE = value.ROLE;
          taskm.executeur.push(resp);
        });
        const dialogRef = this.dialog.open(TaskDetailComponent, {
          width: '40%',
          data: taskm,
        });
        //   dialogRef.componentInstance.notified.subscribe(result => {
        //     console.log('Got the data!', result);
        // });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            let taskTemp = this.task;
            this.task = result;
            if (
              taskTemp.tache.DATE_FIN.getTime() !=
              this.task.tache.DATE_FIN.getTime()
            ) {
              this.task.tache.DATE_FIN.setDate(
                this.task.tache.DATE_FIN.getDate() - 1
              );
            }
            if (
              taskTemp.tache.DATE_DEBUT.getTime() !=
              this.task.tache.DATE_DEBUT.getTime()
            ) {
              this.task.tache.DATE_DEBUT.setDate(
                this.task.tache.DATE_DEBUT.getDate() - 1
              );
            }
            this.checkTaskDeadline();
          }
        });
      });
  }
}
