import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  constructor() {
  }

  getMenu(user:any):any{
    let menu:any;
    if(user.ID_ROLE == 'R1'){
      menu=[];
    }
    if(user.ID_ROLE == 'R2'){
      menu= [{
        title: 'Espaces',
        url: '/home',
      },
      {
        title: 'Dossiers',
        url: '/dossier',
      },
      {
        title: 'Créer espace',
        url: '/creerespace',
      },]
    }
    if(user.ID_ROLE == 'R3'){
      menu=[];
    }
    return menu;
  }
}
