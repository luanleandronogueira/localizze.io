import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet'

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  veiculos: any;
  constructor(private httpClient: HttpClient) { }

  async chama_veiculos(){
    interface ApiResponse {
      message: number;
      success: boolean;
      data?: {
        id: number,
        veiculo: string,
        modelo: string
      }
    }
    
    const url = "http://localhost/api_localizze/endpoints_chama_veiculos.php";
    const headers = { 'Content-Type': 'application/json' };

    this.httpClient.get<ApiResponse>(url, {headers}).subscribe({
      next: (response) => {
        console.log(response);
        if(response.message === 0){
          this.veiculos = response;
          // console.log("Requisição deu certo:", this.veiculos);
        } else {
          console.log("Não tem carros cadastrados:", response);
        }
      },
      error: (err) =>{
        console.log(err);
      }
    })

  }
  

}
