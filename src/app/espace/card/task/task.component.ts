import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as feather from 'feather-icons';
import { TaskService } from 'src/app/shared/task.service';
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
  constructor(public dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    feather.replace();
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
        }
      });
    });
  }
}
