import { Component, Input, OnInit } from '@angular/core';
import { EspaceService } from 'src/app/shared/espace.service';
import { AlarmeService } from 'src/app/shared/reminder/alarme.service';
import { getUserViaToken } from 'src/app/shared/token.utils';
import { Task } from '../card/task/task.model';
import { TaskMember } from '../card/task/taskMember.model';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  userSession!: any;
  // @Input() socket: any;
  @Input() taskList!: TaskMember[];

  constructor(
    private espaceService: EspaceService,
    private taskAlarm: AlarmeService
  ) {}

  ngOnInit(): void {
    this.userSession = getUserViaToken();
  }
  disconnect() {
    // if (this.socket) {
    //   this.socket.disconnect();
    // }
    this.espaceService.disconnect();
  }
  // pushNotifIfTodayAlarm() {
  //   let dateAlarme: Date;
  //   for (let t in this.taskList) {
  //     this.taskAlarm.getAlarmsTask(t.ID_TACHE).subscribe((data: any) => {
  //       if (data) {
  //         dateAlarme = new Date(data[0].ALARME);
  //         dateAlarme.setHours(0, 0, 0);
  //         let today: Date = new Date();
  //         today.setHours(0, 0, 0);
  //         let todayTime = today.toString();
  //         let alarmeTime = dateAlarme.toString();
  //         if (todayTime === alarmeTime) {
  //           // this.espaceService.getNotif().subscribe();
  //         }
  //       }
  //     });
  //   }
  // }
}
