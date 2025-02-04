import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { FunctionsService } from '../services/functions.service';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import * as L from 'leaflet'

@Component({
  selector: 'app-cadastra-rota',
  templateUrl: './cadastra-rota.page.html',
  styleUrls: ['./cadastra-rota.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})

export class CadastraRotaPage implements OnInit {

  usuario: any;
  veiculos: any;
  mensagem: any;
  dados: any[] = [];
  dado = localStorage.getItem('usuario');
  rota_saida = {
    local_saida_rota: "",
    km_saida_rota: "",
    obs_saida_rota: "",
    id_usuario_rota: "",
    veiculo_rota: "",
    id_entidade_rota: ""
  }

  constructor(private router: Router, private httpClient: HttpClient, private functions: FunctionsService, private toastController: ToastController) { }

  cadastraRota(){
    const url = 'http://localhost/api_localizze/endpoints_inserir_rota_saida.php';
    const headers = { 'Content-Type': 'application/json' };

    interface ApiResponse {
      message: number;
      success: boolean;
      data?: {
        id: number;
        saida: string;
        kilometragem_saida: string;
        veiculo_saida: string;
        observacoes: string;
        id_entidade: number;
      }
    }

    console.log(this.rota_saida);
    this.mensagem = "Dados Recebidos com sucesso"
    this.mostraToast(this.mensagem);

    // this.httpClient.post<ApiResponse>(url, this.rota_saida, {headers}).subscribe({

    // })
  }

  ngOnInit() {
    this.coletaLocalizacao();    
    this.recuperaUsuario();
    this.recuperaVeiculos();
    
  }

  recuperaVeiculos(){
    this.veiculos = this.functions.chama_veiculos();
    console.log(this.veiculos)
  }

  recuperaUsuario(){
    //inciar os dados e colocar no storage local
    const dados_usuario = localStorage.getItem('usuario');
    if(dados_usuario){
      this.usuario = JSON.parse(dados_usuario);
      console.log('Usuário recuperado:', this.usuario)
    } else{
      this.router.navigate(['/home']);
      console.log('Nenhum usuário encontrado no localStorage.');
    }

    // insere informações nos campos da interface
    this.rota_saida.id_entidade_rota = this.usuario.dados.id_entidade_usuario;
    this.rota_saida.id_usuario_rota = this.usuario.dados.id
  
  }

  async coletaLocalizacao(){ 
    try {
      const posicao = await Geolocation.getCurrentPosition();
      console.log('Latitude:', posicao.coords.latitude);
      console.log('Longitude:', posicao.coords.longitude);

      // criação do mapa
      const map = L.map('mapId').setView([posicao.coords.latitude, posicao.coords.longitude], 19);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      var marker = L.marker([posicao.coords.latitude, posicao.coords.longitude]).addTo(map);

    } catch (error){
      this.mensagem = "Erro ao coletar a localização, LIGUE O GPS ou tente mais tarde!";
      this.mostraToast(this.mensagem);
      console.error('Erro ao obter localização:', error);
    }
  }  

  async mostraToast(mensagem: any){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'middle',
    });
    await toast.present(); // Exibe o toast
  }
}
