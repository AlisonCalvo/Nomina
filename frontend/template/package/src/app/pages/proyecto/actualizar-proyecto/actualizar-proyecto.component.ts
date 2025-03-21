import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
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
import { ProyectoService } from '../../../services/ProyectoService';
import { PersonaService } from '../../../services/PersonaService';

interface ProyectoModel {
  /** id de la entidad */
  id: number;
  /** nombre de la entidad */
  nombre: string;
  /** valorContrato de la entidad */
  valorContrato: number;
  /** tiempoContractual de la entidad */
  tiempoContractual: string;
  /** objetoContractual de la entidad */
  objetoContractual: string;
  /** alcanceContractual de la entidad */
  alcanceContractual: string;
  /** estado de la entidad */
  estado: boolean;
  /** numeroContrato de la entidad */
  numeroContrato: string;
  /** cliente de la entidad */
  cliente: string;
  /** fechaInicio de la entidad */
  fechaInicio: Date;
  /** fechaFin de la entidad */
  fechaFin: Date;
  /** creador de la entidad */
  creador: string;
  /** persona de la entidad */
  persona: any;
}

/**
 * Componente para la actualización de Proyecto
 * @description Maneja el formulario de actualización utilizando Formly
 */
@Component({
  selector: 'app-actualizar-proyecto',
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
  templateUrl: './actualizar-proyecto.component.html',
  styleUrls: ['./actualizar-proyecto.component.scss']
})
export class ActualizarProyectoComponent implements OnInit {
  /** Lista de todas las entidades */
  proyectos: any[] = [];
  /** Lista de persona disponibles */
  personas: any[] = [];
  /** Entidad seleccionada para actualizar */
  selectedProyecto: any = null;
  form = new FormGroup({});
  model: ProyectoModel = {} as ProyectoModel;
  originalModel: ProyectoModel = {} as ProyectoModel;
  fields: FormlyFieldConfig[] = [];

  /**
   * Constructor del componente
   * @param proyectoService Servicio principal de la entidad
   * @param personaService Servicio para gestionar Persona
   * @param router Servicio de enrutamiento
   * @param snackBar Servicio para notificaciones
   * @param data Datos recibidos por el diálogo
   * @param dialogRef Referencia al diálogo
   */
  constructor(
    private proyectoService: ProyectoService,
    private personaService: PersonaService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ActualizarProyectoComponent>
  ) {}

  /** Inicialización del componente */
  ngOnInit() {
    this.loadProyectos();
    this.loadPersonaOptions();

    // Verificamos si llega data a través del diálogo (registro para editar)
    if (this.data) {
      try {
        this.selectedProyecto = { ...this.data };
        // Inicializar modelo con los datos recibidos
        this.model = {
          id: this.data.id,
          nombre: this.data.nombre,
          valorContrato: this.data.valorContrato,
          tiempoContractual: this.data.tiempoContractual,
          objetoContractual: this.data.objetoContractual,
          alcanceContractual: this.data.alcanceContractual,
          estado: this.data.estado,
          numeroContrato: this.data.numeroContrato,
          cliente: this.data.cliente,
          fechaInicio: this.data.fechaInicio,
          fechaFin: this.data.fechaFin,
          creador: this.data.creador,
          persona: this.data.persona ? this.data.persona.map((item:any) => item.id) : []
        };

        // Copia del modelo original para detectar cambios
        this.originalModel = {
          id: this.data.id,
          nombre: this.data.nombre,
          valorContrato: this.data.valorContrato,
          tiempoContractual: this.data.tiempoContractual,
          objetoContractual: this.data.objetoContractual,
          alcanceContractual: this.data.alcanceContractual,
          estado: this.data.estado,
          numeroContrato: this.data.numeroContrato,
          cliente: this.data.cliente,
          fechaInicio: this.data.fechaInicio,
          fechaFin: this.data.fechaFin,
          creador: this.data.creador,
          persona: this.data.persona ? this.data.persona.map((item:any) => item.id) : []
        };
      } catch (error) {
        console.error('Error al procesar datos:', error);
      }
    }
    this.generateFormFields();
  }

  /** Carga la lista de entidades disponibles */
  loadProyectos() {
    this.proyectoService.findAll().subscribe(
      data => this.proyectos = data,
      error => console.error(error)
    );
  }

  /**
   * Carga las opciones para la relación Persona
   * @private
   */
  private loadPersonaOptions() {
    this.personaService.findAll().subscribe(
      data => {
        // Ordenar alfabéticamente por nombre
        data.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
        const field = this.fields.find(f => f.key === 'persona');
        if (field && field.templateOptions) {
          field.templateOptions.options = data;
        }
      },
      error => console.error('Error al cargar persona:', error)
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
  onEdit(proyecto: any) {
    this.selectedProyecto = { ...proyecto };
    this.model = { ...this.selectedProyecto };
    // Procesar relación many-to-many: persona
    if (this.model.persona && Array.isArray(this.model.persona)) {
      this.model.persona = this.model.persona.map((item:any) => item.id);
    }
    this.generateFormFields();
  }

  /**
   * Genera la configuración de campos del formulario
   */
  generateFormFields() {
    this.fields = [
      {
        key: 'nombre',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Nombre',
          placeholder: 'Ingrese nombre',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'valorContrato',
        type: 'number',
        className: 'field-container',
        templateOptions: {
          label: 'ValorContrato',
          placeholder: 'Ingrese valorContrato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          min: 0,
          max: 9007199254740991,
          step: 1
        }
      },
      {
        key: 'tiempoContractual',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'TiempoContractual',
          placeholder: 'Ingrese tiempoContractual',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'objetoContractual',
        type: 'textarea',
        className: 'field-container',
        templateOptions: {
          label: 'ObjetoContractual',
          placeholder: 'Ingrese objetoContractual',
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
        key: 'alcanceContractual',
        type: 'textarea',
        className: 'field-container',
        templateOptions: {
          label: 'AlcanceContractual',
          placeholder: 'Ingrese alcanceContractual',
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
        key: 'estado',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Estado',
          placeholder: 'Ingrese estado',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [{ value: true, label: 'En curso' }, { value: false, label: 'Finalizado' }]
        }
      },
      {
        key: 'numeroContrato',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'NumeroContrato',
          placeholder: 'Ingrese numeroContrato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
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
        key: 'fechaInicio',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha de inicio del proyecro',
          placeholder: 'Ingrese la fecha de inicio del proyecto',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        },
        validators: {
          dateValidation: {
            expression: (control: AbstractControl): boolean => {
              const fechaInicio = control.value;
              const fechaFin = this.model.fechaFin;
              return !fechaFin || !fechaInicio || new Date(fechaFin) >= new Date(fechaInicio);
            },
            message: (field: FormlyFieldConfig): string => `La fecha de inicio del proyecto debe ser anterior o igual a la fecha de finalización.`
          }
        }
      },
      {
        key: 'fechaFin',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha de finalización del proyecto',
          placeholder: 'Ingrese la fecha de finalización del proyecto',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        },
        validators: {
          dateValidation: {
            expression: (control: AbstractControl): boolean => {
              const fechaInicio = this.model.fechaInicio;
              const fechaFin = control.value;
              return !fechaFin || !fechaInicio || new Date(fechaFin) >= new Date(fechaInicio);
            },
            message: (field: FormlyFieldConfig): string => `La fecha de finalización del proyecto debe ser posterior o igual a la fecha de inicio.`
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
          disabled: true,
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'persona',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Personas',
          placeholder: 'Seleccione personas',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          multiple: true,
          options: [],
          valueProp: 'id',
          labelProp: 'nombre',
          filter: true
        }
      }
    ];
  }

  onSubmit() {
    // 1. Acciones previas
    this.preUpdate(this.model);

    const modelData = { ...this.model };

    modelData.persona = Array.isArray(modelData.persona)
      ? modelData.persona.map((id: number) => ({ id }))
      : [];

    // Si no se subieron archivos, procedemos a actualizar directamente
    this.updateEntity(modelData);
  }

  private updateEntity(modelData: any) {
    // Asumimos que modelData.id existe en tu modelo para saber cuál actualizar.
    this.proyectoService.update(modelData.id, modelData).subscribe({
      next: (response) => {
        this.postUpdate(response);
      },
      error: (error) => {
        console.error('Error al actualizar Proyecto:', error);
        this.snackBar.open('Error al actualizar Proyecto', 'Cerrar', {
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
  private hasChanges(model: ProyectoModel): boolean {
    for (const key in model) {
      const keyTyped = key as keyof ProyectoModel;
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
   * Método para acciones previas a actualizar Proyecto.
   */
  preUpdate(model: any) {
    // Verificar si el formulario es válido
    if (!this.form.valid) {
      throw new Error('El formulario no es válido.');
    }

    // Verificar si hubo cambios
    if (!this.hasChanges(model)) {
      this.snackBar.open('No se han realizado cambios en Proyecto.', 'Cerrar', {
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
   * Método para acciones posteriores al actualizar Proyecto.
   */
  postUpdate(response: any) {
    this.snackBar.open('Proyecto actualizado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postUpdate completadas.');
  }

}
