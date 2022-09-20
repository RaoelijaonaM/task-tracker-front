import { Component, OnInit } from '@angular/core';
import { DossierService } from '../shared/dossier.service';
import { Dossier } from './dossier.model';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css'],
})
export class DossierComponent implements OnInit {
  dossierEtudiant: Dossier[] = [];
  constructor(private dossierService: DossierService) {}

  ngOnInit(): void {
    this.getDossierEtudiant();
  }
  getDossierEtudiant() {
    this.dossierService.getDossier().subscribe((data) => {
      data.data.forEach((element: any) => {
        let dossier = new Dossier();
        dossier.id_etudiant = element.ID_UTILISATEUR;
        dossier.etudiant = element.ETUDIANT;
        dossier.dossier = JSON.parse(element.DOSSIER);
        this.dossierEtudiant.push(dossier);
      });
      console.log("dossierET: ",this.dossierEtudiant);
    });
  }
}
