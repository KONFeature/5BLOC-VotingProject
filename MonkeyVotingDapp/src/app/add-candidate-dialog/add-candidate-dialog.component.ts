import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ContractService } from "../services/contract.service";

@Component({
  selector: "app-add-candidate-dialog",
  templateUrl: "add-candidate-dialog.component.html",
  styles: []
})
export class AddCandidateDialogComponent implements OnInit {
  form: FormGroup;
  candidateName: String;

  constructor(
    private contractService: ContractService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCandidateDialogComponent>
  ) {
    this.form = fb.group({
      name: [this.candidateName, Validators.required]
    });
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  async save() {
    try {
      // check if the form is valid first
      if (this.form.valid) {
        // Then add candidate
        await this.contractService.addCandidate(this.form.value.name);
        // And close the form
        this.dialogRef.close();
      }
    } catch (e) {
      // If we have an error we log it
      console.error(e);
    }
  }
}
