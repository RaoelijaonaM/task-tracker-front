import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validation } from '../shared/validation.model';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Validation
  ) {}

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close();
  }
  onOkClick() {
    this.data.status = 1;
    this.dialogRef.close(this.data);
  }
}
