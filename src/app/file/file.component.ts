import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Task } from '../espace/card/task/task.model';
import { FileService } from '../shared/file.service';
import { File } from './file.model';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
})
export class FileComponent implements OnInit {
  @Input() tache!: Task;
  @Output() sendNotif = new EventEmitter<number>();
  constructor(private storage: Storage, private fileservice: FileService) {}
  progression: number = 0;
  ngOnInit(): void {}

  sendFileToStorage(event: any) {
    console.log('Event', event);
    const file = event.target.files[0];
    const filePath = `${this.tache.ID_TACHE}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    const uploads = uploadBytesResumable(fileRef, file);
    let self = this;
    uploads.on(
      'state_changed',
      function (snapshot) {
        self.progression = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(self.progression);
      },
      function (error) {},
      function () {
        getDownloadURL(uploads.snapshot.ref).then((downloadUrl) => {
          let fichier: File = new File();
          fichier.ID_TACHE = self.tache.ID_TACHE;
          fichier.LINK = downloadUrl;
          fichier.TITRE = file.name;
          console.log('fichier ', fichier);
          self.fileservice.insertFile(fichier).subscribe((data)=>{
            self.sendNotif.emit(1);
          });
        });
      }
    );
  }
}
