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
  MatCheckboxModule,
  MatTabsModule
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
    MatCheckboxModule,
    MatTabsModule
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
    MatCheckboxModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
