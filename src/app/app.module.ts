import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';
import { RentalModule } from './rental/rental.module';



const route: Routes = [
  {path: '' , redirectTo: '/rentals', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    AuthModule,
    RouterModule.forRoot(route),
    BrowserModule,
    AppRoutingModule,
    RentalModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
