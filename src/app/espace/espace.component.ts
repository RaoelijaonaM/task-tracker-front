import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../shared/task.service';
import { ValidationComponent } from '../validation/validation.component';
import { Task } from './card/task/task.model';
@Component({
  selector: 'app-espace',
  templateUrl: './espace.component.html',
  styleUrls: ['./espace.component.css'],
})
export class EspaceComponent implements OnInit {
  tasks!: Task[];
  taskTodo!: Task[];
  taskProgress!: Task[];
  taskFinished!: Task[];
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasksList();
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
}
