import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CadastraRotaPageRoutingModule } from './cadastra-rota-routing.module';

import { CadastraRotaPage } from './cadastra-rota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastraRotaPageRoutingModule,
    RouterModule.forChild([{ path: '', component: CadastraRotaPage }])
  ],
  // declarations: [CadastraRotaPage]
})
export class CadastraRotaPageModule {}
