import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet'

@Component({
  selector: 'app-cadastra-rota',
  templateUrl: './cadastra-rota.page.html',
  styleUrls: ['./cadastra-rota.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})

export class CadastraRotaPage implements OnInit {

  usuario: any;
  constructor(private router: Router, private httpClient: HttpClient,) { }

  cadastraRota(){
    interface ApiResponse {
      message: number;
      success: boolean;
      data?: {
        id: number;
        saida: string;
        kilometragem_saida: string;
        observacoes: string;
        id_entidade: number;
      }
    }



  }


  ngOnInit() {
    // criação do mapa
    const map = L.map('mapId').setView([-8.890900, -36.495931], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var marker = L.marker([-8.890900, -36.495931]).addTo(map);

    //inciar os dados e colocar no storage local
    const dados_usuario = localStorage.getItem('usuario');
    if(dados_usuario){
      this.usuario = JSON.parse(dados_usuario);
      console.log('Usuário recuperado:', this.usuario)
    }else{
      this.router.navigate(['/home']);
      console.log('Nenhum usuário encontrado no localStorage.');
    }


  }

}
