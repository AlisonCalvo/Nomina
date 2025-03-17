import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = environment.baseUrlApi + '/files';

  constructor(private http: HttpClient) {}

  // Obtiene la lista de archivos
  getFileList(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

  // Descarga el archivo como blob
  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download?file=${fileName}`, { responseType: 'blob' });
  }
}
