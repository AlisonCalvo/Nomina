// Importaciones de Angular core y HTTP
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

/**
 * Interfaz que define la estructura de la entidad Proyecto
 */
export interface Proyecto {
  /** nombre - Campo de texto */
  nombre: string;
  /** valorContrato - Campo de tipo long */
  valorContrato: number;
  /** tiempoContractual - Campo de texto */
  tiempoContractual: string;
  /** objetoContractual - Campo de texto */
  objetoContractual: string;
  /** alcanceContractual - Campo de texto */
  alcanceContractual: string;
  /** estado - Campo de tipo boolean */
  estado: boolean;
  /** numeroContrato - Campo de texto */
  numeroContrato: string;
  /** cliente - Campo de texto */
  cliente: string;
  /** fechaInicio - Campo de tipo LocalDate */
  fechaInicio: Date;
  /** fechaFin - Campo de tipo LocalDate */
  fechaFin: Date;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Interfaz que define la estructura del DTO para Proyecto
 * Utilizada para la transferencia de datos entre el frontend y backend
 */
export interface ProyectoDTO {
  /** nombre - Campo de texto */
  nombre: string;
  /** valorContrato - Campo de tipo long */
  valorContrato: number;
  /** tiempoContractual - Campo de texto */
  tiempoContractual: string;
  /** objetoContractual - Campo de texto */
  objetoContractual: string;
  /** alcanceContractual - Campo de texto */
  alcanceContractual: string;
  /** estado - Campo de tipo boolean */
  estado: boolean;
  /** numeroContrato - Campo de texto */
  numeroContrato: string;
  /** cliente - Campo de texto */
  cliente: string;
  /** fechaInicio - Campo de tipo LocalDate */
  fechaInicio: Date;
  /** fechaFin - Campo de tipo LocalDate */
  fechaFin: Date;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Servicio que maneja las operaciones CRUD y otras funcionalidades
 * relacionadas con la entidad Proyecto
 */
@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la aplicación
})
export class ProyectoService {
  /** URL base para las peticiones al backend */
  private baseUrl = environment.baseUrlApi;

  /**
   * Constructor del servicio
   * @param httpClient Cliente HTTP de Angular para realizar peticiones
   */
  constructor(private httpClient: HttpClient) {}

  // Método para obtener todos los registros
  findAll(): Observable<Proyecto[]> {
    const headers = new HttpHeaders().set('Accion', 'findAll').set('Objeto', 'Proyecto');
    const url = `${this.baseUrl}/proyectos`;
    return this.httpClient.get<Proyecto[]>(url, {headers});
  }

  // Método para buscar un registro por su ID
  findById(id: number): Observable<Proyecto> {
    const url = `${this.baseUrl}/proyectos/${id}`;
    const headers = new HttpHeaders().set('Accion', 'findById').set('Objeto', 'Proyecto');
    return this.httpClient.get<Proyecto>(url, {headers});
  }

  // Método para save
  save(dto: ProyectoDTO): Observable<Proyecto> {
    const url = `${this.baseUrl}/proyectos`;
    const headers = new HttpHeaders().set('Accion', 'save').set('Objeto', 'Proyecto');
    return this.httpClient.post<Proyecto>(url, dto, {headers});
  }

  // Método para actualizar un registro existente
  update(id: number, dto: ProyectoDTO): Observable<Proyecto> {
    const url = `${this.baseUrl}/proyectos/${id}`;
    const headers = new HttpHeaders().set('Accion', 'update').set('Objeto', 'Proyecto');
    return this.httpClient.put<Proyecto>(url, dto, {headers});
  }

  // Método para deleteById
  deleteById(id: number): Observable<void> {
    const url = `${this.baseUrl}/proyectos/${id}`;
    const headers = new HttpHeaders().set('Accion', 'deleteById').set('Objeto', 'Proyecto');
    return this.httpClient.delete<void>(url, {headers});
  }

}
