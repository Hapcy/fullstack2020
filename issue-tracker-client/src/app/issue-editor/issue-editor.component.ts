import { Component, OnInit } from '@angular/core';
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

  submit(form: any): void {
    console.log(form);
  }

}
