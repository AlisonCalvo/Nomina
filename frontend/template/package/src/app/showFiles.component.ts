import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatLine, MatOption} from "@angular/material/core";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-show-files-list',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    NgForOf
  ],
  template: `
    <h1 mat-dialog-title>Archivos disponibles</h1>
    <div mat-dialog-content>
      <mat-list>
        <mat-list-item *ngFor="let file of files">
          <mat-icon matListItemIcon>insert_drive_file</mat-icon>
          <span matListItemTitle>{{ file }}</span>
        </mat-list-item>
      </mat-list>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
    </div>
  `
})
export class ShowFilesListComponent implements OnInit {
  files: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ShowFilesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data && this.data.files) {
      this.files = this.data.files;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
