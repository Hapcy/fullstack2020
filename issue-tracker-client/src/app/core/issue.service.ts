import { Injectable } from '@angular/core';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  issues: Issue[] = [
    {
      id: 1,
      title: 'Issue1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra imperdiet ex vitae iaculis. Donec scelerisque porta tincidunt. Morbi consequat enim ornare sapien scelerisque ultricies vel sit amet dolor. Duis vitae neque id mi blandit tincidunt suscipit eu orci. Curabitur aliquam elit justo, ut sagittis ipsum sollicitudin a. Curabitur accumsan, augue a tincidunt malesuada, nibh massa vehicula diam, quis porta metus odio vel mi.',
      user: 'Tibi',
      labels: [],
      messages: [{ user: 'Admin', text: 'De nem is rossz a számítógép.' }],
    },
    {
      id: 2,
      title: 'Issue2',
      description: 'leiras',
      user: 'Tibi',
      labels: [],
    },
  ];

  constructor() { }

  getIssues(): Issue[] {
    return this.issues;
  }

  getIssue(issueId: number): Issue {
    return this.issues.find(issue => issue.id === issueId);
  }

  createIssue(issue: Issue): void {
    this.issues.push(issue);
  }
}
