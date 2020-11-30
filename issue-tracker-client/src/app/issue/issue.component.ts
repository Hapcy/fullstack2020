import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
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

  message: FormControl = this.fb.control('', Validators.required);

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
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

  async addMessage(): Promise<void> {
    if (this.message.invalid) {
      return;
    }
    const createdMessage = await this.issueService.addMessage(
      this.issue,
      this.message.value
    );
    this.issue.messages.push(createdMessage);
    this.message.reset('');
  }

  async deleteIssue(): Promise<void> {
    await this.issueService.deleteIssue(this.issue);
    this.router.navigate(['/', 'issues']);
  }
}
