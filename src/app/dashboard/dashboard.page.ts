import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true, // Indica que esse componente é Standalone
  imports: [CommonModule, IonicModule],
})

export class DashboardPage implements OnInit{
  usuario: any;

  constructor(private router: Router){}

  ngOnInit(){
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
