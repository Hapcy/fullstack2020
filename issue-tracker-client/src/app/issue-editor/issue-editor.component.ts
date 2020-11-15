import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Issue } from '../core/issue';

@Component({
  selector: 'app-issue-editor',
  templateUrl: './issue-editor.component.html',
  styleUrls: ['./issue-editor.component.scss']
})
export class IssueEditorComponent implements OnInit {

  editing: boolean = false;

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IssueEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private issue: Issue
  ) {
    if (issue) {
      this.form.reset({
        title: this.issue.title,
        description: this.issue.description,
      });
      this.editing = true;
    }
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

}
