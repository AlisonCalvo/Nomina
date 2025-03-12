// Importaciones de Angular core y HTTP
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

/**
 * Interfaz que define la estructura de la entidad Informe
 */
export interface Informe {
  /** contenido - Campo de texto */
  contenido: string;
  /** fecha - Campo de tipo LocalDate */
  fecha: Date;
  /** actividades - Campo de texto */
  actividades: string;
  /** cliente - Campo de texto */
  cliente: string;
  /** cargo - Campo de texto */
  cargo: string;
  /** cuentaCobro - Campo de tipo CuentaCobro */
  cuentaCobro: any;
  /** proyecto - Campo de tipo Proyecto */
  proyecto: any;
  /** contrato - Campo de tipo Contrato */
  contrato: any;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Interfaz que define la estructura del DTO para Informe
 * Utilizada para la transferencia de datos entre el frontend y backend
 */
export interface InformeDTO {
  /** contenido - Campo de texto */
  contenido: string;
  /** fecha - Campo de tipo LocalDate */
  fecha: Date;
  /** actividades - Campo de texto */
  actividades: string;
  /** cliente - Campo de texto */
  cliente: string;
  /** cargo - Campo de texto */
  cargo: string;
  /** cuentaCobro - Campo de tipo CuentaCobro */
  cuentaCobro: any;
  /** proyecto - Campo de tipo Proyecto */
  proyecto: any;
  /** contrato - Campo de tipo Contrato */
  contrato: any;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Servicio que maneja las operaciones CRUD y otras funcionalidades
 * relacionadas con la entidad Informe
 */
@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la aplicación
})
export class InformeService {
  /** URL base para las peticiones al backend */
  private baseUrl = environment.baseUrlApi;

  /**
   * Constructor del servicio
   * @param httpClient Cliente HTTP de Angular para realizar peticiones
   */
  constructor(private httpClient: HttpClient) {}

  // Método para obtener todos los registros
  findAll(): Observable<Informe[]> {
    const headers = new HttpHeaders().set('Accion', 'findAll').set('Objeto', 'Informe');
    const url = `${this.baseUrl}/informes`;
    return this.httpClient.get<Informe[]>(url, {headers});
  }

  // Método para buscar un registro por su ID
  findById(id: number): Observable<Informe> {
    const url = `${this.baseUrl}/informes/${id}`;
    const headers = new HttpHeaders().set('Accion', 'findById').set('Objeto', 'Informe');
    return this.httpClient.get<Informe>(url, {headers});
  }

  // Método para save
  save(dto: InformeDTO): Observable<Informe> {
    const url = `${this.baseUrl}/informes`;
    const headers = new HttpHeaders().set('Accion', 'save').set('Objeto', 'Informe');
    return this.httpClient.post<Informe>(url, dto, {headers});
  }

  // Método para actualizar un registro existente
  update(id: number, dto: InformeDTO): Observable<Informe> {
    const url = `${this.baseUrl}/informes/${id}`;
    const headers = new HttpHeaders().set('Accion', 'update').set('Objeto', 'Informe');
    return this.httpClient.put<Informe>(url, dto, {headers});
  }

  // Método para deleteById
  deleteById(id: number): Observable<void> {
    const url = `${this.baseUrl}/informes/${id}`;
    const headers = new HttpHeaders().set('Accion', 'deleteById').set('Objeto', 'Informe');
    return this.httpClient.delete<void>(url, {headers});
  }

}
