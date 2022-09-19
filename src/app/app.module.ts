import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/***********************Module************************/
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
/*************Component*****************************/
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { CreerespaceComponent } from './creerespace/creerespace.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { DossierComponent } from './dossier/dossier.component';
import { CardComponent } from './espace/card/card.component';
import { TaskDetailComponent } from './espace/card/task/task-detail/task-detail.component';
import { TaskComponent } from './espace/card/task/task.component';
import { EspaceComponent } from './espace/espace.component';
import { NotificationComponent } from './espace/notification/notification.component';
import { FileComponent } from './file/file.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './shared/auth.guard';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'dossier', component: DossierComponent },
  { path: 'creerespace', component: CreerespaceComponent },
  { path: 'espace', component: EspaceComponent, canActivate: [AuthGuard] },
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
    AuthentificationComponent,
    DiscussionComponent,
    NotificationComponent,
    FileComponent,
    HomepageComponent,
    NavbarComponent,
    CreerespaceComponent,
    DossierComponent,
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
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately',
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
