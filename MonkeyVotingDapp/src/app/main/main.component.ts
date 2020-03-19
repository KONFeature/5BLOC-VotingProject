import { Component, Inject, OnInit } from "@angular/core";
import {
  ContractService,
  Candidate,
  Voter
} from "../services/contract.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddCandidateDialogComponent } from "../add-candidate-dialog/add-candidate-dialog.component";
import { DelegateVotingDialogComponent } from "../delegate-voting-dialog/delegate-voting-dialog.component";
import { ChangeEndDateDialogComponent } from "../change-end-date-dialog/change-end-date-dialog.component";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  endDate: Date;
  voter: Voter;

  displayedColumns: string[] = ["name", "voteCount", "action"];
  candidatesDataSource = new MatTableDataSource<Candidate>();

  constructor(
    private contractService: ContractService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.fetchVoter();
    this.fetchEndDate();
    this.fetchCandidates();
  }

  async fetchVoter() {
    try {
      // Retreive the voter
      this.voter = await this.contractService.whoAmI();
      console.log(this.voter);
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

  async fetchEndDate() {
    try {
      // Fetch the candidates to the election
      this.endDate = await this.contractService.getEndDate();
    } catch (e) {
      console.error(e);
    }
  }

  async onClickVote(candidateId: number) {
    try {
      // Vote for the candidate
      await this.contractService.voteForCandidate(candidateId);
      // Refresh voters & candidate when vote is validated
      this.fetchVoter();
      this.fetchCandidates();
    } catch (e) {
      console.error(e);
    }
  }

  async participate() {
    try {
      // Vote for the candidate
      await this.contractService.participateToElection();
      // Refresh voters & candidate when user is added
      this.fetchVoter();
      this.fetchCandidates();
    } catch (e) {
      console.error(e);
    }
  }

  openAddCandidateDialog() {
    this.dialog
      .open(AddCandidateDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.fetchCandidates();
      });
  }

  openDelegateDialog() {
    this.dialog
      .open(DelegateVotingDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.fetchCandidates();
        this.fetchVoter();
      });
  }

  openChangeEndDateDialog() {
    this.dialog
      .open(ChangeEndDateDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.fetchEndDate();
      });
  }
}
