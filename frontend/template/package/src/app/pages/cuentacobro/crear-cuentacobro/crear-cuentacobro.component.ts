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
import { CuentaCobroService } from '../../../services/CuentaCobroService';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ContratoService } from '../../../services/ContratoService';
import { InformeService } from '../../../services/InformeService';

interface CuentaCobroModel {
  montoCobrar: number;
  fecha: Date;
  estado: boolean;
  numeroCuenta: string;
  detalle: string;
  pago: boolean;
  notificacionPago: string;
  firmaGerente: any;
  firmaContratista: any;
  creador: string;
  contrato: any;
  informe: any;
}

@Component({
  selector: 'app-crear-cuentacobro',
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
  templateUrl: './crear-cuentacobro.component.html',
  styleUrls: ['./crear-cuentacobro.component.scss']
})
export class CrearCuentaCobroComponent implements OnInit {
  form = new FormGroup({});
  model: CuentaCobroModel = {
    montoCobrar: 0,
    fecha: new Date(),
    estado: false,
    numeroCuenta: '',
    detalle: '',
    pago: false,
    notificacionPago: '',
    firmaGerente: '',
    firmaContratista: '',
    creador: '',
    contrato: null,
    informe: null
  };
  fields: FormlyFieldConfig[] = [];

  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<CrearCuentaCobroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cuentaCobroService: CuentaCobroService,
    private contratoService: ContratoService,
    private informeService: InformeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const username = this.authService.getUsername();
    this.model.creador = username;
    this.fields = [
      {
        key: 'montoCobrar',
        type: 'number',
        className: 'field-container',
        templateOptions: {
          label: 'MontoCobrar',
          placeholder: 'Ingrese montoCobrar',
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
          options: [{ value: true, label: 'Aprobada' }, { value: false, label: 'No aprobada' }]
        }
      },
      {
        key: 'numeroCuenta',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'NumeroCuenta',
          placeholder: 'Ingrese numeroCuenta',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'detalle',
        type: 'textarea',
        className: 'field-container',
        templateOptions: {
          label: 'Detalle',
          placeholder: 'Ingrese detalle',
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
        key: 'pago',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Pago',
          placeholder: 'Ingrese pago',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [{ value: true, label: 'Realizado' }, { value: false, label: 'Pendiente' }]
        }
      },
      {
        key: 'notificacionPago',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'NotificacionPago',
          placeholder: 'Ingrese notificacionPago',
          required: false,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'firmaGerente',
        type: 'file',
        templateOptions: {
          label: 'FirmaGerente',
          placeholder: 'Seleccione firmaGerente',
          multiple: true,
          required: true,
          accept: '.pdf,.doc,.xls,.ppt'
        }
      },
      {
        key: 'firmaContratista',
        type: 'file',
        templateOptions: {
          label: 'FirmaContratista',
          placeholder: 'Seleccione firmaContratista',
          multiple: true,
          required: true,
          accept: '.pdf,.doc,.xls,.ppt'
        }
      },
      {
        key: 'contrato',
        type: 'select',
        className: 'field-container',
        templateOptions: {
          label: 'Contrato',
          placeholder: 'Seleccione contrato',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          },
          options: [],
          valueProp: 'id',
          labelProp: 'numeroContrato'
        }
      }
    ];

    this.loadContratoOptions();
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
    this.isLoading = true;

    modelData.contrato = { id: this.model.contrato };

    const uploadOperations: Observable<void>[] = [];
    const fileFields: (keyof CuentaCobroModel)[] = ['firmaGerente', 'firmaContratista'];

     const handleFileUpload = (field: keyof CuentaCobroModel) => {
       const files = this.model[field];

       if (Array.isArray(files) && files.length > 0) {
         const upload$ = this.cuentaCobroService.uploadFiles(files).pipe(
           switchMap(rutas => {
            // @ts-ignore
             modelData[field] = rutas.join(',');
             return of(undefined);
           }),
           catchError(error => {
             this.handleUploadError(field as string, error);
             return throwError(error);
           })
         );
         uploadOperations.push(upload$);
       } else if (files instanceof File) {
         const upload$ = this.cuentaCobroService.uploadFile(files).pipe(
           switchMap(ruta => {
            // @ts-ignore
             modelData[field] = ruta;
             return of(undefined);
           }),
           catchError(error => {
             this.handleUploadError(field as string, error);
             return throwError(error);
           })
         );
         uploadOperations.push(upload$);
       }
    };

     fileFields.forEach(field => handleFileUpload(field));

     if (uploadOperations.length > 0) {
       forkJoin(uploadOperations).subscribe({
         next: () => this.saveEntity(modelData),
         error: () => this.isLoading = false
       });
     } else {
       this.saveEntity(modelData);
       }
     }

  private handleUploadError(field: string, error: any) {
     console.error(`Error subiendo archivos en ${field}:`, error);
     this.snackBar.open(`Error subiendo ${field}`, 'Cerrar', {
       duration: 3000,
       panelClass: ['error-snackbar']
     });
     this.isLoading = false;
   }

  private saveEntity(modelData: any) {
     this.cuentaCobroService.save(modelData).subscribe({
       next: (response) => {
         this.isLoading = false;
         this.postCreate(response);
       },
       error: (error) => {
         this.isLoading = false;
         console.error('Error al crear CuentaCobro:', error);
         this.snackBar.open('Error al crear CuentaCobro', 'Cerrar', {
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
    this.snackBar.open('CuentaCobro creado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postCreate completadas.');
  }
}
