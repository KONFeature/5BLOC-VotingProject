import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ContractService } from "../services/contract.service";

@Component({
  selector: "app-change-end-date-dialog",
  templateUrl: "change-end-date-dialog.component.html",
  styles: []
})
export class ChangeEndDateDialogComponent implements OnInit {
  today = new Date();
  form: FormGroup;
  endDate: Date;

  constructor(
    private contractService: ContractService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangeEndDateDialogComponent>
  ) {
    this.form = fb.group({
      endDate: [this.endDate, Validators.required]
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
        // Then change the end date
        await this.contractService.updateEndDate(this.form.value.endDate);
        // And close the form
        this.dialogRef.close();
      }
    } catch (e) {
      // If we have an error we log it
      console.error(e);
    }
  }
}
