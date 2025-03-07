
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FinalizaRotaPageRoutingModule } from './finaliza-rota-routing.module';
import { FinalizaRotaPage } from './finaliza-rota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizaRotaPageRoutingModule,
    FinalizaRotaPage 
  ]
})
export class FinalizaRotaPageModule {}
