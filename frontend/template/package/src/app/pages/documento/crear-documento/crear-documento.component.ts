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
import { DocumentoService } from '../../../services/DocumentoService';
import { PersonaService } from '../../../services/PersonaService';
import { ContratoService } from '../../../services/ContratoService';

interface DocumentoModel {
  nombre: string;
  descripcion: string;
  fechaCarga: Date;
  estado: boolean;
  formato: string;
  etiqueta: string;
  rutaArchivo: string;
  creador: string;
  persona: any;
  contrato: any;
}

@Component({
  selector: 'app-crear-documento',
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
  templateUrl: './crear-documento.component.html',
  styleUrls: ['./crear-documento.component.scss']
})
export class CrearDocumentoComponent implements OnInit {
  form = new FormGroup({});
  model: DocumentoModel = {
    nombre: '',
    descripcion: '',
    fechaCarga: new Date(),
    estado: false,
    formato: '',
    etiqueta: '',
    rutaArchivo: '',
    creador: '',
    persona: null,
    contrato: null
  };
  fields: FormlyFieldConfig[] = [];

  constructor(
    private dialogRef: MatDialogRef<CrearDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentoService: DocumentoService,
    private personaService: PersonaService,
    private contratoService: ContratoService,
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
        key: 'descripcion',
        type: 'textarea',
        className: 'field-container',
        templateOptions: {
          label: 'Descripcion',
          placeholder: 'Ingrese descripcion',
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
        key: 'fechaCarga',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'FechaCarga',
          placeholder: 'Ingrese fechaCarga',
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
          options: [{ value: true, label: 'Activo' }, { value: false, label: 'Inactivo' }]
        }
      },
      {
        key: 'formato',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Formato',
          placeholder: 'Ingrese formato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'etiqueta',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Etiqueta',
          placeholder: 'Ingrese etiqueta',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
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

    this.loadPersonaOptions();
    this.loadContratoOptions();
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

  private loadContratoOptions() {
    this.contratoService.findAll().subscribe(
      data => {
        const field = this.fields.find(f => f.key === 'contrato');
        if (field && field.templateOptions) {
          field.templateOptions.options = data;
        }
      },
      error => console.error('Error al cargar contrato:', error)
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
    modelData.persona = { id: this.model.persona };
    modelData.contrato = { id: this.model.contrato };
    // Si no hay archivos a subir o no es un campo file, guardamos directo
    this.saveEntity(modelData);
  }

  private saveEntity(modelData: any) {
    this.documentoService.save(modelData).subscribe({
      next: (response) => {
        this.postCreate(response);
      },
      error: (error) => {
        console.error('Error al crear Documento:', error);
        this.snackBar.open('Error al crear Documento', 'Cerrar', {
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
    this.snackBar.open('Documento creado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postCreate completadas.');
  }
}
