import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/***********************Module************************/
import { RouterModule, Routes } from '@angular/router';
/*************Component*****************************/
import { AppComponent } from './app.component';
import { CardComponent } from './espace/card/card.component';
import { TaskComponent } from './espace/card/task/task.component';
import { EspaceComponent } from './espace/espace.component';

const routes: Routes = [{ path: 'espace', component: EspaceComponent }];
@NgModule({
  declarations: [AppComponent, EspaceComponent, CardComponent, TaskComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
