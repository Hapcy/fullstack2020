import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private httpClient: HttpClient) {}

  async getIssues(): Promise<Issue[]> {
    const issues = await this.httpClient
      .get<Issue[]>('/api/issues')
      .toPromise();
    return issues;
  }

  async getIssue(issueId: number): Promise<Issue> {
    const issue = await this.httpClient
      .get<Issue>(`/api/issues/${issueId}`)
      .toPromise();
    return issue;
  }

  async createIssue(issue: Issue): Promise<Issue> {
    const createdIssue = await this.httpClient
      .post<Issue>('/api/issues', issue)
      .toPromise();
    return createdIssue;
  }

  async editIssue(issueId: number, issue: Issue): Promise<Issue> {
    const modifiedIssue = this.httpClient
      .put<Issue>(`/api/issues/${issueId}`, issue)
      .toPromise();
    return modifiedIssue;
  }
}
