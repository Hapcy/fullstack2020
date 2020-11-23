import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../core/issue';
import { IssueService } from '../core/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() showDetails: boolean = true;
  @Input() issue: Issue;

  @Output() editIssue: EventEmitter<Issue> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.issue) {
      const issueId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
      this.issue = await this.issueService.getIssue(issueId);
    }
  }

  edit(): void {
    this.editIssue.emit(this.issue);
  }
}
