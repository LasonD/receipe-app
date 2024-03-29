import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from "./auth.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [{ path: '', component: AuthComponent, },];

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }
