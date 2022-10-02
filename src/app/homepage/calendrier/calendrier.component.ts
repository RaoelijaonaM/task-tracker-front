import { Component, OnInit } from '@angular/core';
import { EspaceService } from 'src/app/shared/espace.service';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],

})
export class CalendrierComponent implements OnInit {
  calendriers:any;
  constructor(private espaceService:EspaceService) {}

  ngOnInit(): void {
    this.espaceService.getSoutenanceCalendar().subscribe((data)=>{
      
     this.calendriers=data.data;
    })
  }
}
