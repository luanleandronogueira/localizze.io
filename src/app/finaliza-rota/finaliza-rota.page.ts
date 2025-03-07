import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from '../services/functions.service';


@Component({
  selector: 'app-finaliza-rota',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './finaliza-rota.page.html',
  styleUrls: ['./finaliza-rota.page.scss'],
})
export class FinalizaRotaPage implements OnInit {
  id_rota_get: any
  rota: any = [] 

  constructor(private route: ActivatedRoute, private functions: FunctionsService) { }

  chama_rota_atual(){
    this.functions.chama_rota(this.id_rota_get).subscribe({
      next: (Response: any) => {
        console.log('Está e a rota atual', Response.data)
        this.rota = Response.data || Response
      }, error(err) {
        console.log('Não permitido')
      },
    })

  }




  ngOnInit() {
    this.id_rota_get = this.route.snapshot.paramMap.get('id_rota')
    this.chama_rota_atual();
  }

}
