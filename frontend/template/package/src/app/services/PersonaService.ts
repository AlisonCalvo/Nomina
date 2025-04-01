// Importaciones de Angular core y HTTP
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

/**
 * Interfaz que define la estructura de la entidad Persona
 */
export interface Persona {
  /** nombre - Campo de texto */
  nombre: string;
  /** correo - Campo de texto */
  correo: string;
  /** numeroDocumento - Campo de tipo int */
  numeroDocumento: number;
  /** tituloProfesional - Campo de texto */
  tituloProfesional: string;
  /** direccion - Campo de texto */
  direccion: string;
  /** telefono - Campo de tipo int */
  telefono: number;
  /** fechaExpedicion - Campo de tipo LocalDate */
  fechaExpedicion: Date;
  /** fechaNacimiento - Campo de tipo LocalDate */
  fechaNacimiento: Date;
  /** nacionalidad - Campo de texto */
  nacionalidad: string;
  /** tipoDocumento - Campo de tipo TipoDocumento */
  tipoDocumento: any;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Interfaz que define la estructura del DTO para Persona
 * Utilizada para la transferencia de datos entre el frontend y backend
 */
export interface PersonaDTO {
  /** nombre - Campo de texto */
  nombre: string;
  /** correo - Campo de texto */
  correo: string;
  /** numeroDocumento - Campo de tipo int */
  numeroDocumento: number;
  /** tituloProfesional - Campo de texto */
  tituloProfesional: string;
  /** direccion - Campo de texto */
  direccion: string;
  /** telefono - Campo de tipo int */
  telefono: number;
  /** fechaExpedicion - Campo de tipo LocalDate */
  fechaExpedicion: Date;
  /** fechaNacimiento - Campo de tipo LocalDate */
  fechaNacimiento: Date;
  /** nacionalidad - Campo de texto */
  nacionalidad: string;
  /** tipoDocumento - Campo de tipo TipoDocumento */
  tipoDocumento: any;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Servicio que maneja las operaciones CRUD y otras funcionalidades
 * relacionadas con la entidad Persona
 */
@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la aplicación
})
export class PersonaService {
  /** URL base para las peticiones al backend */
  private baseUrl = environment.baseUrlApi;

  /**
   * Constructor del servicio
   * @param httpClient Cliente HTTP de Angular para realizar peticiones
   */
  constructor(private httpClient: HttpClient) {}

  // Método para obtener todos los registros
  findAll(): Observable<Persona[]> {
    const headers = new HttpHeaders().set('Accion', 'findAll').set('Objeto', 'Persona');
    const url = `${this.baseUrl}/personas`;
    return this.httpClient.get<Persona[]>(url, {headers});
  }

  // Método para buscar un registro por su ID
  findById(id: number): Observable<Persona> {
    const url = `${this.baseUrl}/personas/${id}`;
    const headers = new HttpHeaders().set('Accion', 'findById').set('Objeto', 'Persona');
    return this.httpClient.get<Persona>(url, {headers});
  }

  // Método para save
  save(dto: PersonaDTO): Observable<Persona> {
    const url = `${this.baseUrl}/personas`;
    const headers = new HttpHeaders().set('Accion', 'save').set('Objeto', 'Persona');
    return this.httpClient.post<Persona>(url, dto, {headers});
  }

  // Método para actualizar un registro existente
  update(id: number, dto: PersonaDTO): Observable<Persona> {
    const url = `${this.baseUrl}/personas/${id}`;
    const headers = new HttpHeaders().set('Accion', 'update').set('Objeto', 'Persona');
    return this.httpClient.put<Persona>(url, dto, {headers});
  }

  // Método para deleteById
  deleteById(id: number): Observable<void> {
    const url = `${this.baseUrl}/personas/${id}`;
    const headers = new HttpHeaders().set('Accion', 'deleteById').set('Objeto', 'Persona');
    return this.httpClient.delete<void>(url, {headers});
  }

  // Método para obtener personas por proyecto
  obtenerPersonasPorProyecto(id: number): Observable<Persona[]> {
    const headers = new HttpHeaders().set('Accion', 'findAll').set('Objeto', 'Persona');
    const url = `${this.baseUrl}/proyectos/${id}/personas`;
    return this.httpClient.get<Persona[]>(url, {headers});
  }

}
