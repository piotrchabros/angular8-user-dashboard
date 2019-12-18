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
  MatPaginatorModule,
  MatCheckboxModule
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
    MatPaginatorModule,
    MatCheckboxModule
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
    MatPaginatorModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
