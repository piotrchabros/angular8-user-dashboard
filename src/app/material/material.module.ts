import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatPaginatorModule
} from '@angular/material'


@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
