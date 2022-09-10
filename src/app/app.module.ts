import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/***********************Module************************/
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
/*************Component*****************************/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CardComponent } from './espace/card/card.component';
import { TaskDetailComponent } from './espace/card/task/task-detail/task-detail.component';
import { TaskComponent } from './espace/card/task/task.component';
import { EspaceComponent } from './espace/espace.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
  { path: 'espace', component: EspaceComponent },
  { path: 'taskDetail', component: TaskDetailComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    EspaceComponent,
    CardComponent,
    TaskComponent,
    TaskDetailComponent,
    ValidationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgScrollbarModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSelectModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
