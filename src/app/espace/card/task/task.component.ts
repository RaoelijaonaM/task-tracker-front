import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as feather from 'feather-icons';
import { EspaceService } from 'src/app/shared/espace.service';
import { AlarmeService } from 'src/app/shared/reminder/alarme.service';
import { TaskService } from 'src/app/shared/task.service';
import { getUserViaToken, isAdmin } from 'src/app/shared/token.utils';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { Task } from './task.model';
export interface DialogData {
  nom: string;
}
@Component({  
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'], 
})
export class TaskComponent implements OnInit, AfterViewInit {
  @Input() task: Task = new Task();
  disable: boolean = true;
  enableImage: boolean = true;
  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private taskAlarm: AlarmeService,
    private espaceService: EspaceService
  ) {}

  ngOnInit(): void {
    this.checkTaskIfCanBeDrag();
    this.ckeckTaskIfCanBeDetailled();
    this.pushNotifIfTodayAlarm();
  }
  ngAfterViewInit(): void {
    feather.replace();
  }
  checkTaskIfCanBeDrag() {
    let userConnected = getUserViaToken();
    let nomUser = userConnected.NOM + ' ' + userConnected.PRENOM;
    console.log(nomUser);
    if (nomUser.match(this.task.ID_UTILISATEUR) || isAdmin()) {
      this.disable = false;
    }
  }
  ckeckTaskIfCanBeDetailled() {
    if (this.task.ROLE == 'Anonyme') {
      this.enableImage = false;
    }
  }
  pushNotifIfTodayAlarm() {
    let dateAlarme: Date;
    this.taskAlarm.getAlarmsTask(this.task.ID_TACHE).subscribe((data: any) => {
      if (data) {
        dateAlarme = new Date(data[0].ALARME);
        dateAlarme.setHours(0, 0, 0);
        let today: Date = new Date();
        today.setHours(0, 0, 0);
        let todayTime = today.toString();
        let alarmeTime = dateAlarme.toString();
        if (todayTime === alarmeTime) {
          this.espaceService.getNotif().subscribe();
        }
      }
    });
  }
  openDetail() {
    this.taskService.getTaskDetail(this.task.ID_TACHE).subscribe((data) => {
      const dialogRef = this.dialog.open(TaskDetailComponent, {
        width: '50%',
        data: data,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.task = result;
          this.task.DATE_FIN.setDate(this.task.DATE_FIN.getDate() - 1);
          this.pushNotifIfTodayAlarm();
        }
      });
    });
  }
}
