import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  address: string;
  balance: string;

  constructor(private contract: ContractService) {
    contract.seeAccountInfo().then((value: any) => {
      this.address = value.originAccount;
      this.balance = value.balance;
    }).catch((error: any) => {
      console.log(error);
      contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });
   }

  ngOnInit() {
  }
  

}
