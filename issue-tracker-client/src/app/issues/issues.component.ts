import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Issue } from '../core/issue';
import { IssueService } from '../core/issue.service';
import { IssueEditorComponent } from '../issue-editor/issue-editor.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {

  issues: Issue[];

  constructor(
    private dialog: MatDialog,
    private issuesService: IssueService,
  ) {}

  ngOnInit(): void {
    this.issues = this.issuesService.getIssues();
  }

  startCreateIssue(): void {
    this.dialog.open(IssueEditorComponent, {
      width: '1000px',
    });
  }

  startEditIssue(issue: Issue): void {
    this.dialog.open(IssueEditorComponent, {
      width: '1000px',
      data: issue,
    });
  }
}
