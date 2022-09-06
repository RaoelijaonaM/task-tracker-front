import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/***********************Module************************/
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {DragDropModule} from '@angular/cdk/drag-drop'
/*************Component*****************************/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CardComponent } from './espace/card/card.component';
import { TaskComponent } from './espace/card/task/task.component';
import { EspaceComponent } from './espace/espace.component';

const routes: Routes = [{ path: 'espace', component: EspaceComponent }];
@NgModule({
  declarations: [AppComponent, EspaceComponent, CardComponent, TaskComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgScrollbarModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
