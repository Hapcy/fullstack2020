import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy/dummy.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: 'dummy',
    component: DummyComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: '**',
    redirectTo: 'dummy',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
