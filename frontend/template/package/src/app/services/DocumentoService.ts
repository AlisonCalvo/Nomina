// Importaciones de Angular core y HTTP
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

/**
 * Interfaz que define la estructura de la entidad Documento
 */
export interface Documento {
  /** nombre - Campo de texto */
  nombre: string;
  /** descripcion - Campo de texto */
  descripcion: string;
  /** fechaCarga - Campo de tipo LocalDate */
  fechaCarga: Date;
  /** estado - Campo de tipo boolean */
  estado: boolean;
  /** formato - Campo de texto */
  formato: string;
  /** etiqueta - Campo de texto */
  etiqueta: string;
  /** rutaArchivo - Campo de texto */
  rutaArchivo: string;
  /** persona - Campo de tipo Persona */
  persona: any;
  /** contrato - Campo de tipo Contrato */
  contrato: any;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Interfaz que define la estructura del DTO para Documento
 * Utilizada para la transferencia de datos entre el frontend y backend
 */
export interface DocumentoDTO {
  /** nombre - Campo de texto */
  nombre: string;
  /** descripcion - Campo de texto */
  descripcion: string;
  /** fechaCarga - Campo de tipo LocalDate */
  fechaCarga: Date;
  /** estado - Campo de tipo boolean */
  estado: boolean;
  /** formato - Campo de texto */
  formato: string;
  /** etiqueta - Campo de texto */
  etiqueta: string;
  /** rutaArchivo - Campo de texto */
  rutaArchivo: string;
  /** persona - Campo de tipo Persona */
  persona: any;
  /** contrato - Campo de tipo Contrato */
  contrato: any;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Servicio que maneja las operaciones CRUD y otras funcionalidades
 * relacionadas con la entidad Documento
 */
@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la aplicación
})
export class DocumentoService {
  /** URL base para las peticiones al backend */
  private baseUrl = environment.baseUrlApi;

  /**
   * Constructor del servicio
   * @param httpClient Cliente HTTP de Angular para realizar peticiones
   */
  constructor(private httpClient: HttpClient) {}

  // Método para obtener todos los registros
  findAll(): Observable<Documento[]> {
    const headers = new HttpHeaders().set('Accion', 'findAll').set('Objeto', 'Documento');
    const url = `${this.baseUrl}/documentos`;
    return this.httpClient.get<Documento[]>(url, {headers});
  }

  // Método para buscar un registro por su ID
  findById(id: number): Observable<Documento> {
    const url = `${this.baseUrl}/documentos/${id}`;
    const headers = new HttpHeaders().set('Accion', 'findById').set('Objeto', 'Documento');
    return this.httpClient.get<Documento>(url, {headers});
  }

  // Método para save
  save(dto: DocumentoDTO): Observable<Documento> {
    const url = `${this.baseUrl}/documentos`;
    const headers = new HttpHeaders().set('Accion', 'save').set('Objeto', 'Documento');
    return this.httpClient.post<Documento>(url, dto, {headers});
  }

  // Método para actualizar un registro existente
  update(id: number, dto: DocumentoDTO): Observable<Documento> {
    const url = `${this.baseUrl}/documentos/${id}`;
    const headers = new HttpHeaders().set('Accion', 'update').set('Objeto', 'Documento');
    return this.httpClient.put<Documento>(url, dto, {headers});
  }

  // Método para deleteById
  deleteById(id: number): Observable<void> {
    const url = `${this.baseUrl}/documentos/${id}`;
    const headers = new HttpHeaders().set('Accion', 'deleteById').set('Objeto', 'Documento');
    return this.httpClient.delete<void>(url, {headers});
  }

}
