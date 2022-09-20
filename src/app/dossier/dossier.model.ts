import { Document } from './document.model';

export class Dossier {
  id_etudiant!: string;
  etudiant!:string;
  dossier: Document[] = [];
}
