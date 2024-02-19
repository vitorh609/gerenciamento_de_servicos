import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';



@NgModule({
  declarations: [
    DataGridComponent
  ],
  exports: [
    DataGridComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DataGridModule { }
