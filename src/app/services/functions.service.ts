import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet'

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  v: any;
  dados: any[] = []
  constructor(private httpClient: HttpClient) { }

  public chama_veiculos(){
    interface ApiResponse {
      message: number;
      success: boolean;
      data?: {
        id: number,
        veiculo: string,
        modelo: string
      }
    }

    const url = "https://l3tecnologia.app.br/api_localizze.io/endpoints_chama_veiculos.php";
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.get<ApiResponse>(url, { headers });

  }

  public insere_rota(dados: any) {
    interface ApiResponse {
      message: number;
      success: boolean;
    }
    
    const url = "https://l3tecnologia.app.br/api_localizze.io/endpoints_inserir_rota_saida.php";
    const headers = { 'Content-Type': 'application/json' };
  
    return this.httpClient.post<ApiResponse>(url, dados, { headers });
  }
  

}
