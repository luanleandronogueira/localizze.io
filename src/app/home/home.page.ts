import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  dados_usuario = {
    usuario: "",
    senha: ""
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  onSubmit(){
    // console.log('Dados:', this.dados_usuario)
    const url = 'http://localhost/api_localizze/endpoints_usuario.php';
    const headers = { 'Content-Type': 'application/json' };

    interface ApiResponse {
      message: number;
      success: boolean;
      data?: {
        usuario: string;
        senha: string;
      };
    }

    this.httpClient.post<ApiResponse>(url, this.dados_usuario, {headers}).subscribe({
      next: (response) => {
        console.log('Resposta da API:', response);
        if(response.message === 0){
          localStorage.setItem('usuario', JSON.stringify(response))
            this.router.navigate(['/dashboard'])
        } else {
          console.log('Erro')
        }
      },
      error: (err) => {
        console.error('Erro ao enviar dados:', err);
      },
    })
  }

}
