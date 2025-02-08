import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  constructor(private httpClient: HttpClient, private router: Router, private toastController: ToastController) {}

  ionViewWillEnter(){
    localStorage.clear();
  }

  mensagem: string = ''
  onSubmit(){
    const url = 'https://l3tecnologia.app.br/api_localizze.io/endpoints_chama_usuario.php';
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
        } else if(response.message === 1) {
          this.mensagem = 'Senha incorreta';
          this.mostraToast(this.mensagem);
          console.log('Erro')

        } else {
          this.mensagem = 'Usuário não encontrado!';
          this.mostraToast(this.mensagem);
        }
      },
      error: (err) => {
        console.error('Erro ao enviar dados:', err);
        // this.mensagem = err;
        // this.mostraToast(this.mensagem);
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

}
