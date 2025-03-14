import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    persona: null
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
          min: -9007199254740991,
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
          label: 'FechaInicio',
          placeholder: 'Ingrese fechaInicio',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'fechaFin',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'FechaFin',
          placeholder: 'Ingrese fechaFin',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
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
          labelProp: 'nombre'
        }
      }
    ];

    this.loadPersonaOptions();
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

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // 1. Validaciones previas
    this.preCreate(this.model);

    // 2. Copiamos el modelo para no mutarlo directamente
    const modelData = { ...this.model };
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
