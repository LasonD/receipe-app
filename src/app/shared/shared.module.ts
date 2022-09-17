import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "./dropdown/dropdown.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    DropdownComponent,
    SpinnerComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    DropdownComponent,
    SpinnerComponent,
    AlertComponent,
  ]
})
export class SharedModule { }
