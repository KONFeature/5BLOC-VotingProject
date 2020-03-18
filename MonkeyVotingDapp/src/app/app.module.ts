import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule} from './app.material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AddCandidateDialogComponent } from './add-candidate-dialog/add-candidate-dialog.component';
import { DelegateVotingDialogComponent } from './delegate-voting-dialog/delegate-voting-dialog.component';
import { ChangeEndDateDialogComponent } from './change-end-date-dialog/change-end-date-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddCandidateDialogComponent,
    DelegateVotingDialogComponent,
    ChangeEndDateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
