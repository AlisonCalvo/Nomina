import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { DateTime } from 'luxon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InformeService } from '../../../services/InformeService';
import { CuentaCobroService } from '../../../services/CuentaCobroService';
import { ProyectoService } from '../../../services/ProyectoService';
import { ContratoService } from '../../../services/ContratoService';

interface InformeModel {
  /** id de la entidad */
  id: number;
  /** contenido de la entidad */
  contenido: string;
  /** fecha de la entidad */
  fecha: Date;
  /** actividades de la entidad */
  actividades: string;
  /** cliente de la entidad */
  cliente: string;
  /** cargo de la entidad */
  cargo: string;
  /** creador de la entidad */
  creador: string;
  /** cuentaCobro de la entidad */
  cuentaCobro: any;
  /** proyecto de la entidad */
  proyecto: any;
  /** contrato de la entidad */
  contrato: any;
}

/**
 * Componente para la actualización de Informe
 * @description Maneja el formulario de actualización utilizando Formly
 */
@Component({
  selector: 'app-actualizar-informe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
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
  templateUrl: './actualizar-informe.component.html',
  styleUrls: ['./actualizar-informe.component.scss']
})
export class ActualizarInformeComponent implements OnInit {
  /** Lista de todas las entidades */
  informes: any[] = [];
  /** Lista de cuentaCobro disponibles */
  cuentaCobros: any[] = [];
  /** Lista de proyecto disponibles */
  proyectos: any[] = [];
  /** Lista de contrato disponibles */
  contratos: any[] = [];
  /** Entidad seleccionada para actualizar */
  selectedInforme: any = null;
  form = new FormGroup({});
  model: InformeModel = {} as InformeModel;
  originalModel: InformeModel = {} as InformeModel;
  fields: FormlyFieldConfig[] = [];

  /**
   * Constructor del componente
   * @param informeService Servicio principal de la entidad
   * @param cuentaCobroService Servicio para gestionar CuentaCobro
   * @param proyectoService Servicio para gestionar Proyecto
   * @param contratoService Servicio para gestionar Contrato
   * @param router Servicio de enrutamiento
   * @param snackBar Servicio para notificaciones
   * @param data Datos recibidos por el diálogo
   * @param dialogRef Referencia al diálogo
   */
  constructor(
    private informeService: InformeService,
    private cuentaCobroService: CuentaCobroService,
    private proyectoService: ProyectoService,
    private contratoService: ContratoService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ActualizarInformeComponent>
  ) {}

  /** Inicialización del componente */
  ngOnInit() {
    this.loadInformes();
    this.loadCuentaCobroOptions();
    this.loadProyectoOptions();
    this.loadContratoOptions();

    // Verificamos si llega data a través del diálogo (registro para editar)
    if (this.data) {
      try {
        this.selectedInforme = { ...this.data };
        // Inicializar modelo con los datos recibidos
        this.model = {
          id: this.data.id,
          contenido: this.data.contenido,
          fecha: this.data.fecha,
          actividades: this.data.actividades,
          cliente: this.data.cliente,
          cargo: this.data.cargo,
          creador: this.data.creador,
          cuentaCobro: this.data.cuentaCobro && this.data.cuentaCobro.id ? this.data.cuentaCobro.id : null,
          proyecto: this.data.proyecto && this.data.proyecto.id ? this.data.proyecto.id : null,
          contrato: this.data.contrato && this.data.contrato.id ? this.data.contrato.id : null
        };

        // Copia del modelo original para detectar cambios
        this.originalModel = {
          id: this.data.id,
          contenido: this.data.contenido,
          fecha: this.data.fecha,
          actividades: this.data.actividades,
          cliente: this.data.cliente,
          cargo: this.data.cargo,
          creador: this.data.creador,
          cuentaCobro: this.data.cuentaCobro && this.data.cuentaCobro.id ? this.data.cuentaCobro.id : null,
          proyecto: this.data.proyecto && this.data.proyecto.id ? this.data.proyecto.id : null,
          contrato: this.data.contrato && this.data.contrato.id ? this.data.contrato.id : null
        };
      } catch (error) {
        console.error('Error al procesar datos:', error);
      }
    }
    this.generateFormFields();
  }

  /** Carga la lista de entidades disponibles */
  loadInformes() {
    this.informeService.findAll().subscribe(
      data => this.informes = data,
      error => console.error(error)
    );
  }

  /**
   * Carga las opciones para la relación CuentaCobro
   * @private
   */
  private loadCuentaCobroOptions() {
    this.cuentaCobroService.findAll().subscribe(
      data => {
        this.cuentaCobros = data;
        this.updateFieldOptions('cuentaCobro', data);
      },
      error => console.error('Error al cargar cuentaCobro:', error)
    );
  }

  /**
   * Carga las opciones para la relación Proyecto
   * @private
   */
  private loadProyectoOptions() {
    this.proyectoService.findAll().subscribe(
      data => {
        this.proyectos = data;
        this.updateFieldOptions('proyecto', data);
      },
      error => console.error('Error al cargar proyecto:', error)
    );
  }

  /**
   * Carga las opciones para la relación Contrato
   * @private
   */
  private loadContratoOptions() {
    this.contratoService.findAll().subscribe(
      data => {
        this.contratos = data;
        this.updateFieldOptions('contrato', data);
      },
      error => console.error('Error al cargar contrato:', error)
    );
  }

  /**
   * Actualiza las opciones de un campo tipo select en el formulario
   */
  private updateFieldOptions(key: string, options: any[]) {
    const field = this.fields.find(f => f.key === key);
    if (field && field.templateOptions) {
      field.templateOptions.options = options;
    }
  }

  /**
   * Maneja la edición de un registro existente
   */
  onEdit(informe: any) {
    this.selectedInforme = { ...informe };
    this.model = { ...this.selectedInforme };
    // Procesar relación simple: cuentaCobro
    if (this.model.cuentaCobro && typeof this.model.cuentaCobro === 'object') {
      this.model.cuentaCobro = this.model.cuentaCobro.id;
    }
    // Procesar relación simple: proyecto
    if (this.model.proyecto && typeof this.model.proyecto === 'object') {
      this.model.proyecto = this.model.proyecto.id;
    }
    // Procesar relación simple: contrato
    if (this.model.contrato && typeof this.model.contrato === 'object') {
      this.model.contrato = this.model.contrato.id;
    }
    this.generateFormFields();
  }

  /**
   * Genera la configuración de campos del formulario
   */
  generateFormFields() {
    this.fields = [
      {
        key: 'contenido',
        type: 'textarea',
        className: 'field-container',
        templateOptions: {
          label: 'Contenido',
          placeholder: 'Ingrese contenido',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          rows: 5
        }
      },
      {
        key: 'fecha',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha',
          placeholder: 'Ingrese fecha',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'actividades',
        type: 'textarea',
        className: 'field-container',
        templateOptions: {
          label: 'Actividades',
          placeholder: 'Ingrese actividades',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          rows: 5
        }
      },
      {
        key: 'cliente',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Cliente',
          placeholder: 'Ingrese cliente',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'cargo',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Cargo',
          placeholder: 'Ingrese cargo',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'creador',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Creador',
          placeholder: 'Ingrese creador',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'cuentaCobro',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'CuentaCobro',
          placeholder: 'Seleccione cuentaCobro',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'montoCobrar'
        }
      },
      {
        key: 'proyecto',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Proyecto',
          placeholder: 'Seleccione proyecto',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'nombre'
        }
      },
      {
        key: 'contrato',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Contrato',
          placeholder: 'Seleccione contrato',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'cargo'
        }
      }
    ];
  }

  onSubmit() {
    // 1. Acciones previas
    this.preUpdate(this.model);

    const modelData = { ...this.model };

    if (modelData.cuentaCobro) {
      modelData.cuentaCobro = { id: modelData.cuentaCobro };
    }

    if (modelData.proyecto) {
      modelData.proyecto = { id: modelData.proyecto };
    }

    if (modelData.contrato) {
      modelData.contrato = { id: modelData.contrato };
    }

    // Si no se subieron archivos, procedemos a actualizar directamente
    this.updateEntity(modelData);
  }

  private updateEntity(modelData: any) {
    // Asumimos que modelData.id existe en tu modelo para saber cuál actualizar.
    this.informeService.update(modelData.id, modelData).subscribe({
      next: (response) => {
        this.postUpdate(response);
      },
      error: (error) => {
        console.error('Error al actualizar Informe:', error);
        this.snackBar.open('Error al actualizar Informe', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  cancelEdit() {
    this.dialogRef.close();
  }

  /**
   * Verifica si hay cambios entre el model actual y el original.
   */
  private hasChanges(model: InformeModel): boolean {
    for (const key in model) {
      const keyTyped = key as keyof InformeModel;
      const newValue = typeof model[keyTyped] === 'string' ? (model[keyTyped] as string).trim() : model[keyTyped];
      const originalValue = typeof this.originalModel[keyTyped] === 'string' ? (this.originalModel[keyTyped] as string).trim() : this.originalModel[keyTyped];

      if (Array.isArray(newValue) && Array.isArray(originalValue)) {
        if (newValue.length !== originalValue.length ||
            newValue.some((item, index) => item.id !== originalValue[index]?.id)) {
          return true; // Cambios en arrays
        }
      } else if (newValue !== originalValue) {
        return true; // Cambio en valor simple
      }
    }
    return false; // No hay cambios
  }

  /**
   * Método para acciones previas a actualizar Informe.
   */
  preUpdate(model: any) {
    // Verificar si el formulario es válido
    if (!this.form.valid) {
      throw new Error('El formulario no es válido.');
    }

    // Verificar si hubo cambios
    if (!this.hasChanges(model)) {
      this.snackBar.open('No se han realizado cambios en Informe.', 'Cerrar', {
        duration: 3000,
      });
      throw new Error('No se han realizado cambios en el registro.');
    }

    // Quitar espacios al inicio y final
    for (const key in model) {
      if (typeof model[key] === 'string') {
        model[key] = model[key].trim();
      }
    }

    // TODO: Verificar permisos si se requiere
    console.log('Validaciones de preUpdate completadas.');
  }

  /**
   * Método para acciones posteriores al actualizar Informe.
   */
  postUpdate(response: any) {
    this.snackBar.open('Informe actualizado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postUpdate completadas.');
  }

}
