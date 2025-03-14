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
import { PersonaService } from '../../../services/PersonaService';
import { ProyectoService } from '../../../services/ProyectoService';
import { TipoDocumentoService } from '../../../services/TipoDocumentoService';
import {PermissionService} from "../../authentication/services/PermissionService";


interface PersonaModel {
  nombre: string;
  correo: string;
  numeroDocumento: number;
  tituloProfesional: string;
  direccion: string;
  telefono: number;
  fechaExpedicion: Date;
  fechaNacimiento: Date;
  nacionalidad: string;
  creador: string;
  proyecto: any;
  tipoDocumento: any;
  necesitaAcceso: boolean;
  roles?: any[];
}

@Component({
  selector: 'app-crear-persona',
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
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {
  form = new FormGroup({});
  model: PersonaModel = {
    nombre: '',
    correo: '',
    numeroDocumento: 0,
    tituloProfesional: '',
    direccion: '',
    telefono: 0,
    fechaExpedicion: new Date(),
    fechaNacimiento: new Date(),
    nacionalidad: '',
    creador: '',
    proyecto: null,
    tipoDocumento: null,
    necesitaAcceso: false,
    roles: [],
  };
  fields: FormlyFieldConfig[] = [];

  constructor(
    private dialogRef: MatDialogRef<CrearPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private personaService: PersonaService,
    private proyectoService: ProyectoService,
    private tipoDocumentoService: TipoDocumentoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    const username = this.authService.getUsername();
    this.model.creador = username;

    this.permissionService.getRoles().subscribe(
      (roles) => {
        const field = this.fields.find(f => f.key === 'roles');
        if (field && field.templateOptions) {
          field.templateOptions.options = roles;
        }
      },
      (error) => console.error('Error al cargar roles:', error)
    );

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
        type: 'number',
        className: 'field-container',
        templateOptions: {
          label: 'NumeroDocumento',
          placeholder: 'Ingrese numeroDocumento',
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
        type: 'number',
        className: 'field-container',
        templateOptions: {
          label: 'Telefono',
          placeholder: 'Ingrese telefono',
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
        key: 'tipoDocumento',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'TipoDocumento',
          placeholder: 'Seleccione tipoDocumento',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'nombreTipoDocumento'
        }
      },
      {
        key: 'necesitaAcceso',
        type: 'checkbox',
        templateOptions: {
          label: '¿Necesita acceso al sistema?',
        }
      },
      {
        key: 'roles',
        type: 'select',
        hideExpression: '!model.necesitaAcceso', // Se oculta si no necesita acceso
        templateOptions: {
          label: 'Roles',
          multiple: true,
          options: [],
          valueProp: 'id',
          labelProp: 'nombre'
        }
      }
    ];

    this.loadTipoDocumentoOptions();
  }

  private loadTipoDocumentoOptions() {
    this.tipoDocumentoService.findAll().subscribe(
      data => {
        const field = this.fields.find(f => f.key === 'tipoDocumento');
        if (field && field.templateOptions) {
          field.templateOptions.options = data;
        }
      },
      error => console.error('Error al cargar tipoDocumento:', error)
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // 1. Validaciones previas
    this.preCreate(this.model);

    // 2. Copiamos el modelo para no mutarlo directamente
    this.preCreate(this.model);
    const modelData = { ...this.model };
    modelData.tipoDocumento = { id: this.model.tipoDocumento };

    // Si necesita acceso, se mandan los roles
    if (this.model.necesitaAcceso) {
      modelData.roles = this.model.roles;
    } else {
      delete modelData.roles;
    }

    // Si no hay archivos a subir o no es un campo file, guardamos directo
    this.saveEntity(modelData);
  }

  private saveEntity(modelData: any) {
    this.personaService.save(modelData).subscribe({
      next: (response) => {
        this.postCreate(response);
      },
      error: (error) => {
        console.error('Error al crear Persona:', error);
        this.snackBar.open('Error al crear Persona', 'Cerrar', {
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
    this.snackBar.open('Persona creado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postCreate completadas.');
  }
}
