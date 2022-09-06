import { AfterViewInit, Component, OnInit,Input } from '@angular/core';
import * as feather from 'feather-icons';
import { Task } from './task.model';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit, AfterViewInit {
  @Input() task:Task = new Task()
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    feather.replace( );
  }
}
