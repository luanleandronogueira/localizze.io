import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastraRotaPage } from './cadastra-rota.page';

const routes: Routes = [
  {
    path: '',
    component: CadastraRotaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastraRotaPageRoutingModule {}
