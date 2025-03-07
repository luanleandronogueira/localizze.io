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
  public chama_rota(id: any){
    interface ApiResponse {
        message: number;
        success: boolean;
        data?: {
          "id_rota": number,
          "local_saida_rota": string,
          "km_saida_rota": string,
          "horario_saida_rota": string,
          "obs_saida_rota": string,
          "long_lat_saida_rota": string,
          "local_destino_rota": string,
          "km_destino_rota": string,
          "horario_destino_rota": string,
          "obs_destino_rota": string,
          "long_lat_destino_rota": string,
          "motorista_rota": string,
          "veiculo_rota": string
        }
      }

      const url = "https://l3tecnologia.app.br/api_localizze.io/endpoinsts_chama_rota_id.php?id=" + id;
      const headers = { 'Content-Type': 'application/json' };

      return this.httpClient.get<ApiResponse>(url, {headers})
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

  public chama_rotas_dashboard(){
      interface ApiResponse {
        message: number;
        success: boolean;
        data?: {
          id_rota: number;
          local_saida_rota: string;
          horario_saida_rota: string;
          local_destino_rota: string;
          horario_destino_rota: string;
        }
      }

      const url = "https://l3tecnologia.app.br/api_localizze.io/endpoints_chama_rota_dashboard.php";
      const headers = { 'Content-Type': 'application/json' };

      return this.httpClient.get<ApiResponse>(url, {headers})
  }
  
  public chama_rota_em_curso(){
    interface ApiResponse {
      message: number;
        success: boolean;
        data?: {
          id_rota: number;
        }
    }

    const url = "https://l3tecnologia.app.br/api_localizze.io/endpoints_chama_rota_atual.php";
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.get<ApiResponse>(url, {headers})
  }
  
}
