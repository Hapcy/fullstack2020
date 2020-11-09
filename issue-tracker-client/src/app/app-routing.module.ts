import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy/dummy.component';
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
    path: '**',
    redirectTo: 'issues',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
