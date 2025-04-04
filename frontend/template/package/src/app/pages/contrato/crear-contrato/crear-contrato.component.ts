import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AbstractControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {distinctUntilChanged, map} from "rxjs";

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
          label: 'Número de Contrato',
          placeholder: 'Ingrese número de contrato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        },
        validation: {
          messages: {
            required: 'El número de contrato es obligatorio.'
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
          },
          pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
          minLength:3,
          maxLength:50
        },
        validation: {
          messages: {
            required: 'El cargo es obligatorio.',
            minlength: 'El cargo debe tener al menos 3 caracteres.',
            pattern: 'El cargo solo puede contener letras.'
          }
        }
      },
      {
        key: 'valorTotalContrato',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Valor Total Contrato',
          placeholder: 'Ingrese valor total contrato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          min: 0,
          max: 9007199254740991
        },
        validators: {
          validation: [Validators.required, Validators.min(0)]
        },
        validation: {
          messages: {
            required: 'El valor total del contrato es obligatorio.',
            min: 'El valor del contrato debe ser mayor o igual a 0.'
          }
        },
        hooks: {
          onInit: (field: FormlyFieldConfig) => {
            field.formControl?.valueChanges
              .pipe(
                distinctUntilChanged(),
                map(value => {
                  // Ensure value is a string
                  const stringValue = String(value);

                  // Eliminar caracteres no numéricos
                  const numericValue = stringValue.replace(/[^\d]/g, '');

                  // Formatear como moneda colombiana si hay valor
                  return numericValue
                    ? new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(Number(numericValue))
                    : '';
                })
              )
              .subscribe(formattedValue => {
                field.formControl?.setValue(formattedValue, { emitEvent: false });
              });
          }
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
          min: 0,
          max: 2147483647,
          step: 1
        },
        validation: {
          messages: {
            required: 'El número de pagos es obligatorio.',
            min: 'El número de pagos debe ser mayor o igual a 0.',
            max: 'El número de pagos es demasiado grande.'
          }
        }
      },
      {
        key: 'fechaInicioContrato',
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
              const fechaInicio = control.value;
              const fechaFin = this.model.fechaFinContrato;
              return !fechaFin || !fechaInicio || new Date(fechaInicio) <= new Date(fechaFin);
            },
            message: 'La fecha de inicio del contrato debe ser anterior o igual a la fecha de finalización.'
          }
        },
        validation: {
          messages: {
            required: 'La fecha de inicio del contrato es obligatoria.'
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
        },
        validators: {
          dateValidation: {
            expression: (control: AbstractControl): boolean => {
              const fechaInicio = this.model.fechaInicioContrato;
              const fechaFin = control.value;
              return !fechaFin || !fechaInicio || new Date(fechaFin) >= new Date(fechaInicio);
            },
            message: 'La fecha de finalización del contrato debe ser posterior o igual a la fecha de inicio.'
          }
        },
        validation: {
          messages: {
            required: 'La fecha de finalización del contrato es obligatoria.'
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
        },
        validation: {
          messages: {
            required: 'El estado es obligatorio.'
          }
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
        },
        validation: {
          messages: {
            required: 'La ruta de archivo es obligatoria.'
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
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [{ value: true, label: 'Aprobado' }, { value: false, label: 'Pendiente' }]
        },
        validation: {
          messages: {
            required: 'El estado de firma es obligatorio.'
          }
        }
      },
      {
        key: 'proyecto',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Proyecto',
          change: (field, event) => {
            // Obtener el valor del proyecto seleccionado
            const value: number = field.formControl?.value;
            this.loadPersonaOptions(value);
            console.log('Proyecto seleccionado:', value);
          },
          placeholder: 'Seleccione proyecto',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'nombre'
        },
        validation: {
          messages: {
            required: 'El proyecto es obligatorio.'
          }
        }
      },
      {
        key: 'persona',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Persona',
          placeholder: 'Seleccione persona',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'nombre',
          filter: true
        },
        validation: {
          messages: {
            required: 'La persona es obligatoria.'
          }
        }
      },
      {
        key: 'tipoContrato',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'TipoContrato',
          placeholder: 'Seleccione tipoContrato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'nombreTipoContrato'
        },
        validation: {
          messages: {
            required: 'El tipo de contrato es obligatorio.'
          }
        }
      },
      {
        key: 'periodicidadPago',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'PeriodicidadPago',
          placeholder: 'Seleccione periodicidadPago',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'tipoPeriodoPago'
        },
        validation: {
          messages: {
            required: 'La periodicidad de pago es obligatoria.'
          }
        }
      }
    ];

    this.loadProyectoOptions();
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

  private loadPersonaOptions(id:number) {
    this.personaService.obtenerPersonasPorProyecto(id).subscribe(
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

    // Limpiar valor de contrato para guardar solo el número
    if (modelData.valorTotalContrato) {
      // Remover prefijo de moneda, separadores de miles y cualquier carácter no numérico
      const cleanedValue = String(modelData.valorTotalContrato)
        .replace(/[^\d]/g, '') // Elimina todo excepto dígitos
        .replace(/^0+/, ''); // Elimina ceros a la izquierda

      // Convertir a número, usar 0 si está vacío
      modelData.valorTotalContrato = cleanedValue ? Number(cleanedValue) : 0;
    }

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
