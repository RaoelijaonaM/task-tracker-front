import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as feather from 'feather-icons';
import { Alarme } from 'src/app/shared/reminder/alarme.model';
import { AlarmeService } from 'src/app/shared/reminder/alarme.service';
import { Repetition } from 'src/app/shared/reminder/repetition.model';
import { TaskService } from 'src/app/shared/task.service';
import { getUserViaToken, isAdmin } from 'src/app/shared/token.utils';
import { ValidationComponent } from 'src/app/validation/validation.component';
import { Task } from '../task.model';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit, AfterViewInit {
  description!: string;
  debut!: string;
  fin!: string;
  reminderList!: Alarme[];
  repetitionList!: Repetition[];
  reminder!: string;
  repetition!: string;
  showUser: boolean = true;
  disableUpdate: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private alarmService: AlarmeService,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAlarmsList();
    this.checkIfUserCanBeShown();
    this.checkIfUserCanUpdate();
  }
  checkIfUserCanBeShown() {
    console.log(this.data.ROLE);
    if (this.data.ROLE == 'Anonyme') {
      this.showUser = false;
    }
  }
  checkIfUserCanUpdate() {
    let userConnected = getUserViaToken();
    let myName = userConnected.NOM + ' ' + userConnected.PRENOM;
    if (this.data.ID_UTILISATEUR == myName || isAdmin()) {
      this.disableUpdate = false;
    }
  }
  ngAfterViewInit(): void {
    feather.replace();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAlarmsList() {
    this.alarmService.getAlarms().subscribe((data) => {
      this.reminderList = data;
      console.log(this.reminderList);
    });
    this.alarmService.getRepetitions().subscribe((data) => {
      this.repetitionList = data;
    });
  }
  updateTask() {
    this.data.DATE_DEBUT = new Date(this.data.DATE_DEBUT);
    this.data.DATE_FIN = new Date(this.data.DATE_FIN);
    this.taskService.updateTaskDetail(this.data).subscribe(
      (data) => {
        console.log("afterUpdate: ",this.data);
        this.dialogRef.close(this.data);
      },
      (err) => {
        const dialogEr = this.dialog.open(ValidationComponent, {
          width: '500px',
          data: { title: 'Erreur', message: err.error.message },
        });
      }
    );
  }
}
