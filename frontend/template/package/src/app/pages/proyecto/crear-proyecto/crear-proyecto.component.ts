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
import { ProyectoService } from '../../../services/ProyectoService';
import { PersonaService } from '../../../services/PersonaService';
import {distinctUntilChanged, map} from "rxjs";

interface ProyectoModel {
  nombre: string;
  valorContrato: number;
  tiempoContractual: string;
  objetoContractual: string;
  alcanceContractual: string;
  estado: boolean;
  numeroContrato: string;
  cliente: string;
  fechaInicio: Date;
  fechaFin: Date;
  creador: string;
  persona: any;
  supervisor: string;
  contactoSupervisor: string;
}

@Component({
  selector: 'app-crear-proyecto',
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
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {
  form = new FormGroup({});
  model: ProyectoModel = {
    nombre: '',
    valorContrato: 0,
    tiempoContractual: '',
    objetoContractual: '',
    alcanceContractual: '',
    estado: false,
    numeroContrato: '',
    cliente: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    creador: '',
    persona: null,
    supervisor: '',
    contactoSupervisor: ''
  };
  fields: FormlyFieldConfig[] = [];

  constructor(
    private dialogRef: MatDialogRef<CrearProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private proyectoService: ProyectoService,
    private personaService: PersonaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const username = this.authService.getUsername();
    this.model.creador = username;
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
          },
          pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
          minLength: 3,
          maxLength: 50
        },
        validation: {
          messages: {
            required: 'El nombre es obligatorio.',
            pattern: 'El nombre solo puede contener letras.',
            minlength: 'El nombre debe tener al menos 3 caracteres.',
          }
        }
      },
      {
        key: 'valorContrato',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Valor del Contrato',
          placeholder: 'Ingrese valor del contrato',
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
            required: 'El valor del contrato es obligatorio.',
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
        key: 'tiempoContractual',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Tiempo Contractual',
          placeholder: 'Ingrese tiempo contractual',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          minLength: 5,
          maxLength: 250
        },
        validation: {
          messages: {
            required: 'El tiempo contractual es obligatorio.',
            minlength: 'El tiempo contractual debe tener al menos 5 caracteres.'
          }
        }
      },
      {
        key: 'objetoContractual',
        type: 'textarea',
        className: 'field-container',
        templateOptions: {
          label: 'Objeto Contractual',
          placeholder: 'Ingrese objeto contractual',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          rows: 5,
          minLength: 5,
          maxLength: 250
        },
        validation: {
          messages: {
            required: 'El objeto contractual es obligatorio.',
            minlength: 'El objeto contractual debe tener al menos 5 caracteres.'
          }
        }
      },
      {
        key: 'alcanceContractual',
        type: 'textarea',
        className: 'field-container',
        templateOptions: {
          label: 'Alcance Contractual',
          placeholder: 'Ingrese alcance contractual',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          rows: 5,
          minLength: 5,
          maxLength: 250
        },
        validation: {
          messages: {
            required: 'El alcance contractual es obligatorio.',
            minlength: 'El alcance contractual debe tener al menos 5 caracteres.',
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
          },
          maxLength: 50
        },
        validation: {
          messages: {
            required: 'El número de contrato es obligatorio.'
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
          },
          pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
          minLength: 3,
          maxLength: 50
        },
        validation: {
          messages: {
            required: 'El cliente es obligatorio.',
            pattern: 'El cliente solo puede contener letras.',
            minlength: 'El cliente debe tener al menos 3 caracteres.',
          }
        }
      },
      {
        key: 'fechaInicio',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha de inicio del proyecto',
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
              return !fechaFin || !fechaInicio || new Date(fechaInicio) <= new Date(fechaFin);
            },
            message: 'La fecha de inicio debe ser anterior o igual a la fecha de finalización.'
          }
        },
        validation: {
          messages: {
            required: 'La fecha de inicio es obligatoria.'
          }
        }
      },
      {
        key: 'fechaFin',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha de finalización del proyecto',
          placeholder: 'Ingrese fecha de finalización del proyecto',
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
            message: 'La fecha de finalización debe ser posterior o igual a la fecha de inicio.'
          }
        },
        validation: {
          messages: {
            required: 'La fecha de finalización es obligatoria.'
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
          required: true,
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
        },
        validation: {
          messages: {
            required: 'Debe seleccionar al menos una persona.'
          }
        }
      },
      {
        key: 'supervisor',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Supervisor de Proyecto',
          placeholder: 'Ingrese nombre del supervisor',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
          minLength: 4,
          maxLength: 100
        },
        validation: {
          messages: {
            minlength: 'El nombre del supervisor debe tener al menos 4 caracteres.',
            required: 'Debe ingresar el nombre del  supervisor.',
            pattern: 'El nombre solo puede contener letras.',
          }
        }
      },
      {
        key: 'contactoSupervisor',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Contacto de Supervisor',
          placeholder: 'Ingrese contacto del supervisor',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          pattern: /^[0-9]*$/,
          minLength: 5,
          maxLength: 20
        },
        validation: {
          messages: {
            pattern: 'Solo se permiten números en este campo.',
            minlength: 'El contacto debe tener al menos 5 dígitos.',
            required: 'Debe ingresar el contacto del  supervisor.'
          }
        }
      }
    ];

    this.loadPersonaOptions();
  }

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


  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // 1. Validaciones previas
    this.preCreate(this.model);

    // 2. Copiamos el modelo para no mutarlo directamente
    const modelData = { ...this.model };

    // Limpiar valor de contrato para guardar solo el número
    if (modelData.valorContrato) {
      // Remover prefijo de moneda, separadores de miles y cualquier carácter no numérico
      const cleanedValue = String(modelData.valorContrato)
        .replace(/[^\d]/g, '') // Elimina todo excepto dígitos
        .replace(/^0+/, ''); // Elimina ceros a la izquierda

      // Convertir a número, usar 0 si está vacío
      modelData.valorContrato = cleanedValue ? Number(cleanedValue) : 0;
    }

    modelData.persona = Array.isArray(this.model.persona)
      ? this.model.persona.map((id: number) => ({ id }))
      : [];

    // Si no hay archivos a subir o no es un campo file, guardamos directo
    this.saveEntity(modelData);
  }

  private saveEntity(modelData: any) {
    this.proyectoService.save(modelData).subscribe({
      next: (response) => {
        this.postCreate(response);
      },
      error: (error) => {
        console.error('Error al crear Proyecto:', error);
        this.snackBar.open('Error al crear Proyecto', 'Cerrar', {
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
    this.snackBar.open('Proyecto creado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postCreate completadas.');
  }
}
