import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { VoteComponent } from './vote/vote.component';
import { WelcomeComponent  } from "./welcome/welcome.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'transaction', component: TransactionComponent },
  { path: 'vote', component: VoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
