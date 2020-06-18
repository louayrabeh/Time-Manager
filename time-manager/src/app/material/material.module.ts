import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatToolbarModule, 
  MatSidenavModule, 
  MatGridListModule, 
  MatCardModule, 
  MatSlideToggleModule,
  MatCheckboxModule,
  MatRadioModule,
  MatIconModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule
} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {RouterModule} from '@angular/router';
const material=[
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatDividerModule,
  MatGridListModule,
  MatCardModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatRadioModule,
  MatIconModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  RouterModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule
]
@NgModule({
  declarations: [],
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
