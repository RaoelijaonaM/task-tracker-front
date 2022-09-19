import { Executeur } from './executeur.model';
import { Task } from './task.model';
export class TaskMember {
  tache!: Task;
  executeur: Executeur[] = [];
}
