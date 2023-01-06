import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { AssignmentComponent } from './assignment/assignment.component';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentComponent,
    Component1Component,
    Component2Component,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
