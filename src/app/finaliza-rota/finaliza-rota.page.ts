import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from '../services/functions.service';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet'


@Component({
  selector: 'app-finaliza-rota',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './finaliza-rota.page.html',
  styleUrls: ['./finaliza-rota.page.scss'],
})
export class FinalizaRotaPage implements OnInit {
  id_rota_get: any
  mensagem: any;
  rota: any = [] 
  coods: any = []
  lat: any
  long: any

  constructor(private route: ActivatedRoute, private functions: FunctionsService, private toastController: ToastController) { }

  localizacao_saida(){
    // criação do mapa
    this.lat = this.coods.split('/')[0]
    this.long = this.coods.split('/')[1]
    const map = L.map('mapId').setView([this.lat, this.long], 19);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var marker = L.marker([this.lat, this.long]).addTo(map); 
  }

  async coletaLocalizacao(){ 
    try {
      const posicao = await Geolocation.getCurrentPosition();
      console.log('Latitude:', posicao.coords.latitude);
      console.log('Longitude:', posicao.coords.longitude);

    } catch (error){
      this.mensagem = "Erro ao coletar a localização, LIGUE O GPS ou tente mais tarde!";
      this.mostraToast(this.mensagem);
      console.error('Erro ao obter localização:', error);
    }
  }  

  chama_rota_atual(){
    this.functions.chama_rota(this.id_rota_get).subscribe({
      next: (Response: any) => {
        this.rota = Response.data || Response
        // recebe as coordenadas da rota que serão separada para poder ser usada no mapa
        this.coods = this.rota.long_lat_saida_rota;

        // Chama a função localizacao_saida após obter as coordenadas
        this.localizacao_saida();
        this.coletaLocalizacao();
      }, error(err) {
        console.log('Não permitido')
      },
    })
  }

  async mostraToast(mensagem: any){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'middle',
    });
    await toast.present(); // Exibe o toast
  }

  finalizaRota(){
    
  }


  ngOnInit() {
    this.id_rota_get = this.route.snapshot.paramMap.get('id_rota')
    this.chama_rota_atual();
  }

}
