import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service.service';
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
import { ContratoService } from '../../../services/ContratoService';
import { ProyectoService } from '../../../services/ProyectoService';
import { PersonaService } from '../../../services/PersonaService';
import { TipoContratoService } from '../../../services/TipoContratoService';
import { PeriodicidadPagoService } from '../../../services/PeriodicidadPagoService';

interface ContratoModel {
  numeroContrato: string;
  cargo: string;
  valorTotalContrato: number;
  numeroPagos: number;
  fechaInicioContrato: Date;
  fechaFinContrato: Date;
  estado: boolean;
  rutaArchivo: string;
  firmado: boolean;
  creador: string;
  proyecto: any;
  persona: any;
  tipoContrato: any;
  periodicidadPago: any;
}

@Component({
  selector: 'app-crear-contrato',
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
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.scss']
})
export class CrearContratoComponent implements OnInit {
  form = new FormGroup({});
  model: ContratoModel = {
    numeroContrato: '',
    cargo: '',
    valorTotalContrato: 0,
    numeroPagos: 0,
    fechaInicioContrato: new Date(),
    fechaFinContrato: new Date(),
    estado: false,
    rutaArchivo: '',
    firmado: false,
    creador: '',
    proyecto: null,
    persona: null,
    tipoContrato: null,
    periodicidadPago: null
  };
  fields: FormlyFieldConfig[] = [];

  constructor(
    private dialogRef: MatDialogRef<CrearContratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contratoService: ContratoService,
    private proyectoService: ProyectoService,
    private personaService: PersonaService,
    private tipoContratoService: TipoContratoService,
    private periodicidadPagoService: PeriodicidadPagoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const username = this.authService.getUsername();
    this.model.creador = username;
    this.fields = [
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
        key: 'valorTotalContrato',
        type: 'number',
        className: 'field-container',
        templateOptions: {
          label: 'ValorTotalContrato',
          placeholder: 'Ingrese valorTotalContrato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          min: -9007199254740991,
          max: 9007199254740991,
          step: 1
        }
      },
      {
        key: 'numeroPagos',
        type: 'number',
        className: 'field-container',
        templateOptions: {
          label: 'NumeroPagos',
          placeholder: 'Ingrese numeroPagos',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          min: -2147483648,
          max: 2147483647,
          step: 1
        }
      },
      {
        key: 'fecha de inicio del contrato',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha de inicio del contrato',
          placeholder: 'Ingrese la fecha de inicio del contrato',
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
              const fechaInicio = this.model.fechaInicioContrato;
              const fechaFin = control.value;
              return !fechaFin || !fechaInicio || new Date(fechaFin) >= new Date(fechaInicio);
            },
            message: (field: FormlyFieldConfig): string => `La fecha de finalización del contrato debe ser posterior o igual a la fecha de inicio.`
          }
        }
      },
      {
        key: 'fechaFinContrato',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha de finalizacion del contrato',
          placeholder: 'Ingrese la fecha de finalizacion del contrato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
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
        key: 'rutaArchivo',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'RutaArchivo',
          placeholder: 'Ingrese rutaArchivo',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'firmado',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Firmado',
          placeholder: 'Ingrese firmado',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [{ value: true, label: 'Firmado' }, { value: false, label: 'Pendiente' }]
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
        key: 'persona',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Persona',
          placeholder: 'Seleccione persona',
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
        key: 'tipoContrato',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'TipoContrato',
          placeholder: 'Seleccione tipoContrato',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'nombreTipoContrato'
        }
      },
      {
        key: 'periodicidadPago',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'PeriodicidadPago',
          placeholder: 'Seleccione periodicidadPago',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'tipoPeriodoPago'
        }
      }
    ];

    this.loadProyectoOptions();
    this.loadPersonaOptions();
    this.loadTipoContratoOptions();
    this.loadPeriodicidadPagoOptions();
  }

  private loadProyectoOptions() {
    this.proyectoService.findAll().subscribe(
      data => {
        const field = this.fields.find(f => f.key === 'proyecto');
        if (field && field.templateOptions) {
          field.templateOptions.options = data;
        }
      },
      error => console.error('Error al cargar proyecto:', error)
    );
  }

  private loadPersonaOptions() {
    this.personaService.findAll().subscribe(
      data => {
        const field = this.fields.find(f => f.key === 'persona');
        if (field && field.templateOptions) {
          field.templateOptions.options = data;
        }
      },
      error => console.error('Error al cargar persona:', error)
    );
  }

  private loadTipoContratoOptions() {
    this.tipoContratoService.findAll().subscribe(
      data => {
        const field = this.fields.find(f => f.key === 'tipoContrato');
        if (field && field.templateOptions) {
          field.templateOptions.options = data;
        }
      },
      error => console.error('Error al cargar tipoContrato:', error)
    );
  }

  private loadPeriodicidadPagoOptions() {
    this.periodicidadPagoService.findAll().subscribe(
      data => {
        const field = this.fields.find(f => f.key === 'periodicidadPago');
        if (field && field.templateOptions) {
          field.templateOptions.options = data;
        }
      },
      error => console.error('Error al cargar periodicidadPago:', error)
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // 1. Validaciones previas
    this.preCreate(this.model);

    // 2. Copiamos el modelo para no mutarlo directamente
    const modelData = { ...this.model };
    modelData.proyecto = { id: this.model.proyecto };
    modelData.persona = { id: this.model.persona };
    modelData.tipoContrato = { id: this.model.tipoContrato };
    modelData.periodicidadPago = { id: this.model.periodicidadPago };
    // Si no hay archivos a subir o no es un campo file, guardamos directo
    this.saveEntity(modelData);
  }

  private saveEntity(modelData: any) {
    this.contratoService.save(modelData).subscribe({
      next: (response) => {
        this.postCreate(response);
      },
      error: (error) => {
        console.error('Error al crear Contrato:', error);
        this.snackBar.open('Error al crear Contrato', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  /**
   * Método para las acciones previas a crear
   */
  preCreate(model: any) {
    if (!this.form.valid) {
      throw new Error('El formulario no es válido.');
    }

    // Quitar espacios al inicio y fin de cadenas
    for (const key in model) {
      if (typeof model[key] === 'string') {
        model[key] = model[key].trim();
      }
    }
    console.log('Validaciones de preCreate completadas.');
  }

  /**
   * Acciones que se ejecutan después de la creación
   */
  postCreate(response: any) {
    this.snackBar.open('Contrato creado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postCreate completadas.');
  }
}
