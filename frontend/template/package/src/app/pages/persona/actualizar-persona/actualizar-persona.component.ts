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
import { PersonaService } from '../../../services/PersonaService';
import { ProyectoService } from '../../../services/ProyectoService';
import { TipoDocumentoService } from '../../../services/TipoDocumentoService';

interface PersonaModel {
  /** id de la entidad */
  id: number;
  /** nombre de la entidad */
  nombre: string;
  /** correo de la entidad */
  correo: string;
  /** numeroDocumento de la entidad */
  numeroDocumento: string;
  /** tituloProfesional de la entidad */
  tituloProfesional: string;
  /** direccion de la entidad */
  direccion: string;
  /** telefono de la entidad */
  telefono: string;
  /** fechaExpedicion de la entidad */
  fechaExpedicion: Date;
  /** fechaNacimiento de la entidad */
  fechaNacimiento: Date;
  /** nacionalidad de la entidad */
  nacionalidad: string;
  /** creador de la entidad */
  creador: string;
  /** proyecto de la entidad */
  proyecto: any;
  /** tipoDocumento de la entidad */
  tipoDocumento: any;
}

/**
 * Componente para la actualización de Persona
 * @description Maneja el formulario de actualización utilizando Formly
 */
@Component({
  selector: 'app-actualizar-persona',
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
  templateUrl: './actualizar-persona.component.html',
  styleUrls: ['./actualizar-persona.component.scss']
})
export class ActualizarPersonaComponent implements OnInit {
  /** Lista de todas las entidades */
  personas: any[] = [];
  /** Lista de proyecto disponibles */
  proyectos: any[] = [];
  /** Lista de tipoDocumento disponibles */
  tipoDocumentos: any[] = [];
  /** Entidad seleccionada para actualizar */
  selectedPersona: any = null;
  form = new FormGroup({});
  model: PersonaModel = {} as PersonaModel;
  originalModel: PersonaModel = {} as PersonaModel;
  fields: FormlyFieldConfig[] = [];

  /**
   * Constructor del componente
   * @param personaService Servicio principal de la entidad
   * @param proyectoService Servicio para gestionar Proyecto
   * @param tipoDocumentoService Servicio para gestionar TipoDocumento
   * @param router Servicio de enrutamiento
   * @param snackBar Servicio para notificaciones
   * @param data Datos recibidos por el diálogo
   * @param dialogRef Referencia al diálogo
   */
  constructor(
    private personaService: PersonaService,
    private proyectoService: ProyectoService,
    private tipoDocumentoService: TipoDocumentoService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ActualizarPersonaComponent>
  ) {}

  /** Inicialización del componente */
  ngOnInit() {
    this.loadPersonas();
    this.loadProyectoOptions();
    this.loadTipoDocumentoOptions();

    // Verificamos si llega data a través del diálogo (registro para editar)
    if (this.data) {
      try {
        this.selectedPersona = { ...this.data };
        // Inicializar modelo con los datos recibidos
        this.model = {
          id: this.data.id,
          nombre: this.data.nombre,
          correo: this.data.correo,
          numeroDocumento: this.data.numeroDocumento,
          tituloProfesional: this.data.tituloProfesional,
          direccion: this.data.direccion,
          telefono: this.data.telefono,
          fechaExpedicion: this.data.fechaExpedicion,
          fechaNacimiento: this.data.fechaNacimiento,
          nacionalidad: this.data.nacionalidad,
          creador: this.data.creador,
          proyecto: this.data.proyecto && this.data.proyecto.id ? this.data.proyecto.id : null,
          tipoDocumento: this.data.tipoDocumento && this.data.tipoDocumento.id ? this.data.tipoDocumento.id : null
        };

        // Copia del modelo original para detectar cambios
        this.originalModel = {
          id: this.data.id,
          nombre: this.data.nombre,
          correo: this.data.correo,
          numeroDocumento: this.data.numeroDocumento,
          tituloProfesional: this.data.tituloProfesional,
          direccion: this.data.direccion,
          telefono: this.data.telefono,
          fechaExpedicion: this.data.fechaExpedicion,
          fechaNacimiento: this.data.fechaNacimiento,
          nacionalidad: this.data.nacionalidad,
          creador: this.data.creador,
          proyecto: this.data.proyecto && this.data.proyecto.id ? this.data.proyecto.id : null,
          tipoDocumento: this.data.tipoDocumento && this.data.tipoDocumento.id ? this.data.tipoDocumento.id : null
        };
      } catch (error) {
        console.error('Error al procesar datos:', error);
      }
    }
    this.generateFormFields();
  }

  /** Carga la lista de entidades disponibles */
  loadPersonas() {
    this.personaService.findAll().subscribe(
      data => this.personas = data,
      error => console.error(error)
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
   * Carga las opciones para la relación TipoDocumento
   * @private
   */
  private loadTipoDocumentoOptions() {
    this.tipoDocumentoService.findAll().subscribe(
      data => {
        this.tipoDocumentos = data;
        this.updateFieldOptions('tipoDocumento', data);
      },
      error => console.error('Error al cargar tipoDocumento:', error)
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
  onEdit(persona: any) {
    this.selectedPersona = { ...persona };
    this.model = { ...this.selectedPersona };
    // Procesar relación simple: proyecto
    if (this.model.proyecto && typeof this.model.proyecto === 'object') {
      this.model.proyecto = this.model.proyecto.id;
    }
    // Procesar relación simple: tipoDocumento
    if (this.model.tipoDocumento && typeof this.model.tipoDocumento === 'object') {
      this.model.tipoDocumento = this.model.tipoDocumento.id;
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
        key: 'correo',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Correo',
          placeholder: 'Ingrese correo',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          patternError: 'El correo debe tener un formato válido (ejemplo: usuario@dominio.com)'
        }
      },
      {
        key: 'numeroDocumento',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Numero de Documento',
          placeholder: 'Ingrese el número de documento',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            class: 'modern-input'
          },
          pattern: /^[0-9]*$/,
          maxLength: 20
        },
        validation: {
          messages: {
            pattern: 'Solo se permiten números en este campo.'
          }
        }
      },
      {
        key: 'tituloProfesional',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'TituloProfesional',
          placeholder: 'Ingrese tituloProfesional',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'direccion',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Direccion',
          placeholder: 'Ingrese direccion',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'telefono',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Teléfono',
          placeholder: 'Ingrese teléfono',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            class: 'modern-input'
          },
          pattern: /^[0-9]*$/,
          maxLength: 20
        },
        validation: {
          messages: {
            pattern: 'Solo se permiten números en este campo.'
          }
        }
      },
      {
        key: 'fechaExpedicion',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'FechaExpedicion',
          placeholder: 'Ingrese fechaExpedicion',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'fechaNacimiento',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'FechaNacimiento',
          placeholder: 'Ingrese fechaNacimiento',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'nacionalidad',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Nacionalidad',
          placeholder: 'Ingrese nacionalidad',
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
          disabled: true,
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'tipoDocumento',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'TipoDocumento',
          placeholder: 'Seleccione tipoDocumento',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'nombreTipoDocumento'
        }
      }
    ];
  }

  onSubmit() {
    // 1. Acciones previas
    this.preUpdate(this.model);

    const modelData = { ...this.model };

    if (modelData.proyecto) {
      modelData.proyecto = { id: modelData.proyecto };
    }

    if (modelData.tipoDocumento) {
      modelData.tipoDocumento = { id: modelData.tipoDocumento };
    }

    // Si no se subieron archivos, procedemos a actualizar directamente
    this.updateEntity(modelData);
  }

  private updateEntity(modelData: any) {
    // Asumimos que modelData.id existe en tu modelo para saber cuál actualizar.
    this.personaService.update(modelData.id, modelData).subscribe({
      next: (response) => {
        this.postUpdate(response);
      },
      error: (error) => {
        console.error('Error al actualizar Persona:', error);
        this.snackBar.open('Error al actualizar Persona', 'Cerrar', {
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
  private hasChanges(model: PersonaModel): boolean {
    for (const key in model) {
      const keyTyped = key as keyof PersonaModel;
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
   * Método para acciones previas a actualizar Persona.
   */
  preUpdate(model: any) {
    // Verificar si el formulario es válido
    if (!this.form.valid) {
      throw new Error('El formulario no es válido.');
    }

    // Verificar si hubo cambios
    if (!this.hasChanges(model)) {
      this.snackBar.open('No se han realizado cambios en Persona.', 'Cerrar', {
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
   * Método para acciones posteriores al actualizar Persona.
   */
  postUpdate(response: any) {
    this.snackBar.open('Persona actualizado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postUpdate completadas.');
  }

}
