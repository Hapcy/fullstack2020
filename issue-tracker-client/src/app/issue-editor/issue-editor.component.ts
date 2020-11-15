import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Issue } from '../core/issue';

@Component({
  selector: 'app-issue-editor',
  templateUrl: './issue-editor.component.html',
  styleUrls: ['./issue-editor.component.scss']
})
export class IssueEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    console.log(form.value);
  }

}
