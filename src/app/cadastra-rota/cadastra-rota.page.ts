import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { FunctionsService } from '../services/functions.service';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core'

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
  veiculos_api: any[] = [];
  dados: any[] = [];
  dado = localStorage.getItem('usuario');
  rota_saida = {
    local_saida_rota: "",
    km_saida_rota: "",
    obs_saida_rota: "",
    id_usuario_rota: "",
    veiculo_rota: "",
    id_entidade_rota: "",
    motorista_rota: "",
    long_lat_saida_rota: ""
  }
  status_rota: any;

  constructor(private router: Router, private httpClient: HttpClient, private functions: FunctionsService, private toastController: ToastController, private cd: ChangeDetectorRef ) { }


  rota_em_curso(){
    this.functions.chama_rota_em_curso().subscribe({
      next: (response: any) => {
        if (response.message == 1){
          this.status_rota = 1
          console.log('Não há nenhuma rota em aberto')
        } else {
          this.status_rota = 0
          console.log('há rotas em aberto')
        }
        this.cd.detectChanges(); // Força a atualização do Angular
      }
      
    })
  }
  ionViewWillEnter() {
    this.rota_em_curso();
  }



  cadastraRota() {
    // console.log("Dados enviados:", this.rota_saida);
    this.functions.insere_rota(this.rota_saida).subscribe({
      next: (response) => {
        if (response.success) { // Se a API retorna um "success" como booleano
          console.log("Dados enviados:", this.rota_saida);
          this.mensagem = "Rota Cadastrada com sucesso!";
          this.mostraToast(this.mensagem);

          // redireciona os para o inicio
          setTimeout(() => {
            this.router.navigate(['/dashboard']).then(() => {
              window.location.reload(); // Força o recarregamento da página
            });
          }, 3000)

        } else {
          console.error("Erro na API:", response.message);
          this.mostraToast("Erro ao cadastrar a rota.");
        }
      },
      error: (err) => {
        console.error("Erro ao cadastrar a rota:", err);
        this.mostraToast("Erro de conexão.");
      }
    });
  }
 
  recuperaVeiculos() {
    this.functions.chama_veiculos().subscribe({
      next: (response) => {
        if (response.message === 0) {
          this.veiculos = this.veiculos = response.data || []; 
          console.log("Veículos carregados veiculos:", this.veiculos);
          console.log("Veículos carregados response:", response);
        } else {
          console.log("Nenhum veículo cadastrado:", response);
        }
      },
      error: (err) => {
        console.error("Erro ao buscar veículos:", err);
      }
    });
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
    this.rota_saida.id_usuario_rota = this.usuario.dados.id;
    this.rota_saida.motorista_rota = this.usuario.dados.id;
  
  }

  async coletaLocalizacao(){ 
    try {
      const posicao = await Geolocation.getCurrentPosition();
      console.log('Latitude:', posicao.coords.latitude);
      console.log('Longitude:', posicao.coords.longitude);

      // Atualiza os dados na interface rota_saida
      this.rota_saida.long_lat_saida_rota = `${posicao.coords.latitude}/${posicao.coords.longitude}`;

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

  ngOnInit() {
    this.coletaLocalizacao();    
    this.recuperaUsuario();
    this.recuperaVeiculos();  
  } 
}
