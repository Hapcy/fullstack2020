import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy/dummy.component';
import { IssueComponent } from './issue/issue.component';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
  {
    path: 'dummy',
    component: DummyComponent,
  },
  {
    path: 'issues',
    component: IssuesComponent,
  },
  {
    path: 'issues/:id',
    component: IssueComponent,
  },
  {
    path: '**',
    redirectTo: 'issues',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
