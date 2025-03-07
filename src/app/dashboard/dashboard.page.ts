import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FunctionsService } from '../services/functions.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true, // Indica que esse componente é Standalone
  imports: [CommonModule, IonicModule],
})

export class DashboardPage implements OnInit{
  usuario: any;
  rotas: any = [];

  constructor(private router: Router, private functions: FunctionsService, private cd: ChangeDetectorRef){}

  // rota para página cadastra_rota
  cadastra_rota(){
    // this.router.navigate(['/cadastra-rota'])
    this.router.navigate(['/cadastra-rota']).then(() => {
      window.location.reload(); // Força o recarregamento da página
    });
  }


  finaliza_rota(id_rota: string){
    this.router.navigate(['/finaliza-rota', id_rota]);
  }

  ionViewWillEnter() {
    // console.log('Página carregada, buscando novas rotas...');
    this.rotas_dashboard(); // Função que consulta os dados na API
  }
  
  rotas_dashboard(){
    this.functions.chama_rotas_dashboard().subscribe({
      next: (response) => {
        console.log("Dashboard carregados response:", response);
        this.rotas = response.data || response;
        //console.log("rotas carregadas", this.rotas)
      },
      error: (err) => {
        console.error("Erro ao buscar as rotas do dashboard:", err);
      }
      
    })
  }

  ngOnInit(){
    const dados_usuario = localStorage.getItem('usuario');
    if(dados_usuario){
      this.usuario = JSON.parse(dados_usuario);
      //console.log('Usuário recuperado:', this.usuario)
    }else{
      this.router.navigate(['/home']);
      console.log('Nenhum usuário encontrado no localStorage.');
    }
    
  }


}
