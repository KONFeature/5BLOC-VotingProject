import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ContractService } from "../services/contract.service";

@Component({
  selector: "app-delegate-voting-dialog",
  templateUrl: "delegate-voting-dialog.component.html",
  styles: []
})
export class DelegateVotingDialogComponent implements OnInit {
  form: FormGroup;
  address: String;

  constructor(
    private contractService: ContractService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DelegateVotingDialogComponent>
  ) {
    this.form = fb.group({
      address: [this.address, Validators.required]
    });
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  async delegate() {
    try {
      // check if the form is valid first
      if (this.form.valid) {
        // Then delegate the vote
        await this.contractService.delegateVote(this.form.value.address);
        // And close the form
        this.dialogRef.close();
      }
    } catch (e) {
      // If we have an error we log it
      console.error(e);
    }
  }
}
