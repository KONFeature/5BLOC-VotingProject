import { Component, Inject, OnInit } from "@angular/core";
import { WEB3 } from "../services/web3.service";
import Web3 from "web3";
import { ContractService, Candidate } from "../services/contract.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddCandidateDialogComponent } from "../add-candidate-dialog/add-candidate-dialog.component";
import { DelegateVotingDialogComponent } from "../delegate-voting-dialog/delegate-voting-dialog.component";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  address: string;
  balance: number;
  isLeader: boolean = false;

  displayedColumns: string[] = ["name", "voteCount", "action"];
  candidatesDataSource = new MatTableDataSource<Candidate>();

  constructor(
    @Inject(WEB3) private web3: Web3,
    private contractService: ContractService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.checkLeader();
    this.fetchAddressAndWallet();
    this.fetchCandidates();
  }

  async checkLeader() {
    try {
      // Check the chairleader
      this.isLeader = (await this.contractService.isThechairpersonMe()) as boolean;
    } catch (e) {
      console.error(e);
    }
  }

  async fetchAddressAndWallet() {
    try {
      // Init web3 wallet
      const wallets = await this.web3.eth.requestAccounts();
      if (wallets.length > 0) {
        // Fetch the first address and it's balance
        this.address = wallets[0];
        const rawBalance = await this.web3.eth.getBalance(this.address);
        this.balance = parseInt(rawBalance, 10) / 1000000000000000000;
      } else {
        throw new Error("No account linked to MetaMask");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async fetchCandidates() {
    try {
      // Fetch the candidates to the election
      const candidates = await this.contractService.getCandidates();
      // Add the candidate in the table
      this.candidatesDataSource = new MatTableDataSource<Candidate>(
        candidates as Candidate[]
      );
    } catch (e) {
      console.error(e);
    }
  }

  async onClickVote(candidateId: number) {
    try {
      // Vote for the candidate
      await this.contractService.voteForCandidate(candidateId);
      // Refresh candidate when vote is validated
      this.fetchCandidates();
    } catch (e) {
      console.error(e);
    }
  }

  openAddCandidateDialog() {
    this.dialog.open(AddCandidateDialogComponent);
  }

  openDelegateDialog() {
    this.dialog.open(DelegateVotingDialogComponent);
  }
}
