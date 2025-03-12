// Importaciones core de Angular
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InformeService } from '../../services/InformeService';

// Importaciones de Angular Material para UI components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Importaciones específicas para tipos de datos especiales
import { DatePipe } from '@angular/common';

/**
 * Componente principal para la gestión de la entidad Informe
 * Proporciona una interfaz para visualizar y manipular los datos de la entidad
 */
@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [
    // Módulos básicos de Angular
    CommonModule,
    RouterModule,
    // Módulos de Angular Material
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class InformeComponent {
  // Atributos de la entidad con sus tipos correspondientes
  /** id - Campo de tipo number */
  id: number;

  /** contenido - Campo de tipo string */
  contenido: string;

  /** fecha - Campo de tipo Date */
  fecha: Date;

  /** actividades - Campo de tipo string */
  actividades: string;

  /** cliente - Campo de tipo string */
  cliente: string;

  /** cargo - Campo de tipo string */
  cargo: string;

  /** creador - Campo de tipo string */
  creador: string;

  /** cuentaCobro - Campo de tipo any */
  cuentaCobro: any;

  /** proyecto - Campo de tipo any */
  proyecto: any;

  /** contrato - Campo de tipo any */
  contrato: any;

  // Configuración de columnas para tablas de atributos y relaciones
  displayedColumnsAttributes: string[] = ['name', 'type'];
  displayedColumnsRelations: string[] = ['entity', 'type'];

  // DataSource para la tabla de atributos
  dataSourceAttributes = new MatTableDataSource([
    { name: 'id', type: 'long' },
    { name: 'contenido', type: 'String' },
    { name: 'fecha', type: 'LocalDate' },
    { name: 'actividades', type: 'String' },
    { name: 'cliente', type: 'String' },
    { name: 'cargo', type: 'String' },
    { name: 'creador', type: 'String' },
    { name: 'cuentaCobro', type: 'CuentaCobro' },
    { name: 'proyecto', type: 'Proyecto' },
    { name: 'contrato', type: 'Contrato' },
  ]);

  // DataSource para la tabla de relaciones
  dataSourceRelations = new MatTableDataSource([
    { entity: 'CuentaCobro', type: 'One-to-One' },
    { entity: 'Proyecto', type: 'Many-to-One' },
    { entity: 'Contrato', type: 'Many-to-One' },
  ]);

  /**
   * Constructor del componente
   * @param service Servicio para la gestión de datos de la entidad
   */
  constructor(private service: InformeService) {
    // Inicialización de atributos con valores por defecto
    this.id = 0;
    this.contenido = '';
    this.fecha = new Date();
    this.actividades = '';
    this.cliente = '';
    this.cargo = '';
    this.creador = '';
    this.cuentaCobro = null;
    this.proyecto = null;
    this.contrato = null;
  }
}
