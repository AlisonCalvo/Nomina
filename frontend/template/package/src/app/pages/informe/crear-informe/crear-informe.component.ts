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
import { InformeService } from '../../../services/InformeService';
import { CuentaCobroService } from '../../../services/CuentaCobroService';
import { ProyectoService } from '../../../services/ProyectoService';
import { ContratoService } from '../../../services/ContratoService';

interface InformeModel {
  contenido: string;
  fecha: Date;
  actividades: string;
  cliente: string;
  cargo: string;
  creador: string;
  cuentaCobro: any;
  proyecto: any;
  contrato: any;
}

@Component({
  selector: 'app-crear-informe',
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
  templateUrl: './crear-informe.component.html',
  styleUrls: ['./crear-informe.component.scss']
})
export class CrearInformeComponent implements OnInit {
  form = new FormGroup({});
  model: InformeModel = {
    contenido: '',
    fecha: new Date(),
    actividades: '',
    cliente: '',
    cargo: '',
    creador: '',
    cuentaCobro: null,
    proyecto: null,
    contrato: null
  };
  fields: FormlyFieldConfig[] = [];

  constructor(
    private dialogRef: MatDialogRef<CrearInformeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private informeService: InformeService,
    private cuentaCobroService: CuentaCobroService,
    private proyectoService: ProyectoService,
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

    this.loadCuentaCobroOptions();
    this.loadProyectoOptions();
    this.loadContratoOptions();
  }

  private loadCuentaCobroOptions() {
    this.cuentaCobroService.findAll().subscribe(
      data => {
        const field = this.fields.find(f => f.key === 'cuentaCobro');
        if (field && field.templateOptions) {
          field.templateOptions.options = data;
        }
      },
      error => console.error('Error al cargar cuentaCobro:', error)
    );
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
    modelData.cuentaCobro = { id: this.model.cuentaCobro };
    modelData.proyecto = { id: this.model.proyecto };
    modelData.contrato = { id: this.model.contrato };
    // Si no hay archivos a subir o no es un campo file, guardamos directo
    this.saveEntity(modelData);
  }

  private saveEntity(modelData: any) {
    this.informeService.save(modelData).subscribe({
      next: (response) => {
        this.postCreate(response);
      },
      error: (error) => {
        console.error('Error al crear Informe:', error);
        this.snackBar.open('Error al crear Informe', 'Cerrar', {
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
    this.snackBar.open('Informe creado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postCreate completadas.');
  }
}
