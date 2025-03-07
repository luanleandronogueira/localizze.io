import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizaRotaPage } from './finaliza-rota.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizaRotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizaRotaPageRoutingModule {}
