import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(private contract: ContractService) { 
    contract.fetchCandidates().then((value: any) => {
      console.log(value)
    })
  }

  ngOnInit() {
  }

}
