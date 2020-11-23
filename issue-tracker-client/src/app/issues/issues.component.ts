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

  constructor(private dialog: MatDialog, private issuesService: IssueService) {}

  async ngOnInit(): Promise<void> {
    this.issues = await this.issuesService.getIssues();
  }

  async startCreateIssue(): Promise<void> {
    const createDialog = this.dialog.open(IssueEditorComponent, {
      width: '1000px',
    });
    const issueToCreate = await createDialog.afterClosed().toPromise<Issue>();
    const createdIssue = await this.issuesService.createIssue(issueToCreate);
    this.issues.push(createdIssue);
  }

  async startEditIssue(issue: Issue): Promise<void> {
    const modifyDialog = this.dialog.open(IssueEditorComponent, {
      width: '1000px',
      data: issue,
    });
    const issueModification = await modifyDialog.afterClosed().toPromise<Issue>();
    const modifiedIssue = await this.issuesService.editIssue(issue.id, issueModification);
    const issueIndex = this.issues.indexOf(issue);
    this.issues.splice(issueIndex, 1, modifiedIssue);
  }
}
