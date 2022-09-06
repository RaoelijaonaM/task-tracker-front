import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
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
  constructor(private taskService: TaskService) {}

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
    if (event.previousContainer === event.container) {
      this.updateStatus(
        event.container.id,
        event.previousContainer.data[event.previousIndex]
      );
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.updateStatus(
        event.container.id,
        event.previousContainer.data[event.previousIndex]
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
