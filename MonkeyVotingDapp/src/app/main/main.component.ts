import { Component, Inject, OnInit } from "@angular/core";
import { WEB3 } from "../services/web3.service";
import { ContractService, Candidate } from "../services/contract.service";
import {MatTableDataSource} from '@angular/material/table';
import Web3 from "web3";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  address: string;
  balance: number;

  displayedColumns: string[] = ['name', 'voteCount', 'action'];
  candidatesDataSource = new MatTableDataSource<Candidate>();

  constructor(
    @Inject(WEB3) private web3: Web3,
    private contractService: ContractService
  ) {}

  async ngOnInit() {
    this.fetchAddressAndWallet();
    this.fetchCandidates();
  }

  fetchAddressAndWallet() {
    // Init web3 wallet
    this.web3.eth.requestAccounts().then((value: string[]) => {
      if (value.length > 0) {
        // Fetch the first address
        this.address = value[0];

        // Fetch the balance of the account
        this.web3.eth.getBalance(this.address).then((value: string) => {
          this.balance = parseInt(value, 10) / 1000000000000000000;
        });
      } else {
        console.error("No account linked to MetaMask");
      }
    });
  }

  fetchCandidates() {
    // Fetch the candidates to the election
    this.contractService
      .getCandidates()
      .then((candidates: Array<Candidate>) => {
        console.log(candidates)
        this.candidatesDataSource = new MatTableDataSource<Candidate>(candidates)
      })
      .catch(console.error);
  }

  onClickVote(candidateId: number) {
    this.contractService
      .voteForCandidate(candidateId)
      .catch(console.error);
  }
}
