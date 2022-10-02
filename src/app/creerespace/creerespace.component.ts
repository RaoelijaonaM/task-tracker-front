import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../authentification/user.model';
import { Executeur } from '../espace/card/task/executeur.model';
import { Task } from '../espace/card/task/task.model';
import { TACHEDEFAUT } from '../espace/card/task/taskD.model';
import { TaskMember } from '../espace/card/task/taskMember.model';
import { Espace } from '../espace/espace.model';
import { Membre } from '../espace/membre.model';
import { EspaceService } from '../shared/espace.service';
import { Alarme } from '../shared/reminder/alarme.model';
import { AlarmeService } from '../shared/reminder/alarme.service';
import { TaskService } from '../shared/task.service';
import { These } from './these.model';
@Component({
  selector: 'app-creerespace',
  templateUrl: './creerespace.component.html',
  styleUrls: ['./creerespace.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreerespaceComponent implements OnInit {
  theseList: These[] = [];
  submitBtn: number = 0;
  adminList: User[] = [];
  prof: User[] = [];
  jury: User[] = [];
  membres: Membre[] = [];
  reminderList!: Alarme[];
  taskD: TACHEDEFAUT[] = [];
  tasks: Task[] = [];
  taskTraite: Task = new Task();
  executeur: TaskMember[] = [];
  membreChoisi: Membre[] = [];
  espaceList:Espace[] = [];
  membre: any = [
    {
      libelle: 'Etudiant',
      id: 'etudiant',
    },
    {
      libelle: 'Service de thèse',
      id: 'admin',
    },
    {
      libelle: 'Directeur de thèse',
      id: 'directeur',
    },
    {
      libelle: 'Rapporteur',
      id: 'rapporteur',
    },
    {
      libelle: '1er Juge',
      id: 'jury1',
    },
    {
      libelle: '2e Juge',
      id: 'jury2',
    },
    {
      libelle: 'Anonyme',
      id: 'anonyme',
    },
  ];
  //forms
  firstFormGroup = this._formBuilder.group({
    etudiant: [],
    admin: [],
    directeur: [],
    rapporteur: [],
    jury1: [],
    jury2: [],
    anonyme: [],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });

  constructor(
    private espaceService: EspaceService,
    private taskService: TaskService,
    private alarmService: AlarmeService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.taskTraite.ID_TACHE = 'task1';
    this.getEspaces();
    this.getTheses();
    this.getMembre();
    this.getJury();
    this.getAlarmsList();
    this.getTaskDefaut();
  }
  getEspaces() {
    this.espaceService.getAllEspace().subscribe((data) => {
      console.log(data);
      this.espaceList = data.data;
    });
  }
  getDetailEspace(event:any){
   let id_espace = event.target.value; 
   this.espaceService.getMembers(id_espace).subscribe((data) => {
    console.log("membres: ",data)
        this.membres = data.data;
    });
    this.espaceService.getTaskOflast(id_espace).subscribe ((data) => {
      console.log(data)
        this.tasks = data.data;
    })
  
  }
  getTheses() {
    this.espaceService.getTheseWithoutSpace().subscribe((data) => {
      this.theseList = data.data;
    });
  }
  getMembre() {
    this.espaceService.getAllUsers().subscribe((data) => {
      data.data.forEach((value: any) => {
        let u = new User();
        u.id_user = value.ID_UTILISATEUR;
        u.nom = value.NOM + ' ' + value.PRENOM;
        if (value.ID_ROLE == 'R3') {
          this.prof.push(u);
          this.jury.push(u);
        }
        if (value.ID_ROLE == 'R2') {
          this.adminList.push(u);
        }
      });
    });
  }
  getAlarmsList() {
    this.alarmService.getAlarms().subscribe((data) => {
      this.reminderList = data;
    });
  }
  getJury() {
    let annee = new Date().getFullYear();
    this.espaceService.getAllProfSoutenance(annee).subscribe((data) => {
      data.data.forEach((value: any) => {
        if (value.FOIS >= 2) {
          const index = this.jury.findIndex(
            (element) => element.id_user === value.ID_UTILISATEUR
          );
          if (index > -1) {
            this.jury.splice(index, 1);
          }
        }
      });
    });
  }
  getTaskDefaut() {
    this.taskService.getTaskDefaut().subscribe((data) => {
      data.data.forEach((element: any) => {
        let tache = new Task();
        tache.ID_TACHED = element.ID_TACHED;
        tache.ID_UTILISATEUR = element.LIBELLE;
        this.tasks.push(tache);
      });
    });
  }
  submitStep() {
    if (this.submitBtn == -1) {
      this.tasks.forEach((element: Task) => {
        this.taskService.updateTask(element.ID_TACHE, element).subscribe();
      });
    } else {
      this.membre.forEach((element: any) => {
        let pers = new Membre();
        pers.ID_UTILISATEUR = this.firstFormGroup.get(element.id)?.value;
        pers.ROLE = element.libelle;
        this.membres.push(pers);
      });
      let id_these =
        this.getTheseId(this.firstFormGroup.get('etudiant')!.value) || 0;
      this.espaceService
        .insertEspace(id_these, this.membres, this.tasks)
        .subscribe((data) => {
          console.log('attendre');
          this.getEspaces();
        });
    }
  } 
  backBtn() {
    this.submitBtn = -1;
  }
  getTheseId(idetudiant: string): number | undefined {
    let these = this.theseList.find(
      (element) => element.ID_UTILISATEUR === idetudiant
    );
    return these?.ID_THESE;
  }
  drop(event: CdkDragDrop<Membre[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.container.data);
    }
  }
  addToList() {
    let ex = new TaskMember();
    ex.tache = this.taskTraite;
    console.log('tache: ', JSON.stringify(ex.tache));
    this.membreChoisi.forEach((element: any) => {
      let resp = new Executeur();
      resp.ID_UTILISATEUR = element.ID_UTILISATEUR;
      resp.libelle = element.NOM;
      resp.PRIORITE = 0;
      ex.executeur.push(resp);
    });
    this.executeur.push(ex);
    let fitambarana = this.membres.concat(this.membreChoisi);
    fitambarana = [...new Set([...this.membres, ...this.membreChoisi])];
    this.membres = fitambarana;
    this.membreChoisi = [];
  }
  setResponsable(m: TaskMember, exec: Executeur) {
    let tache = m.executeur.find(
      (element) => element.ID_UTILISATEUR == exec.ID_UTILISATEUR
    );
    if (tache) {
      tache.PRIORITE = 1;
    }
  }
  submitExecuteur() {
    console.log('tresponsable: ', this.executeur);
    this.espaceService.insertResponsable(this.executeur).subscribe();
  }
}
