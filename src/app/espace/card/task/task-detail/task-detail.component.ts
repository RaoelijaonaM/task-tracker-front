import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as feather from 'feather-icons';
import { File } from 'src/app/file/file.model';
import { FileService } from 'src/app/shared/file.service';
import { Alarme } from 'src/app/shared/reminder/alarme.model';
import { AlarmeService } from 'src/app/shared/reminder/alarme.service';
import { TaskService } from 'src/app/shared/task.service';
import { getUserViaToken, isAdmin } from 'src/app/shared/token.utils';
import { ValidationComponent } from 'src/app/validation/validation.component';
import { TaskMember } from '../taskMember.model';
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
  reminder!: string;
  disableUpdate: boolean = true;
  displayedColumns: string[] = ['Titre', 'Link'];
  fichier: File[] = [];
  @Output() sendNotif = new EventEmitter<number>();

  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskMember,
    private alarmService: AlarmeService,
    private taskService: TaskService,
    private fileService: FileService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAlarmsList();
    this.checkIfUserCanBeShown();
    this.checkIfUserCanUpdate();
    this.getAllFiles();
  }
  checkIfUserCanBeShown() {
    this.data.executeur.forEach((element) => {
      if (element.ROLE == 'Anonyme') {
        element.shown = false;
      }
    });
  }
  checkIfUserCanUpdate() {
    let userConnected = getUserViaToken();
    let myName = userConnected.NOM + ' ' + userConnected.PRENOM;
    const findMe = this.data.executeur.find((ex) => {
      return ex.ID_UTILISATEUR === myName;
    });
    if (findMe?.PRIORITE == 1 || isAdmin()) {
      this.disableUpdate = false;
    }
  }
  getAllFiles() {
    this.fileService.getAllFiles(this.data.tache.ID_TACHE).subscribe((data) => {
      this.fichier = data.data;
    });
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
  }
  notified(isa: number) {
    console.log('*************notif1: ');
    this.sendNotif.emit(isa);
  }
  updateTask() {
    this.data.tache.DATE_DEBUT = new Date(this.data.tache.DATE_DEBUT);
    this.data.tache.DATE_FIN = new Date(this.data.tache.DATE_FIN);
    this.taskService.updateTaskDetail(this.data.tache).subscribe(
      (data) => {
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
