import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
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
import { ContratoService } from '../../../services/ContratoService';
import { InformeService } from '../../../services/InformeService';

interface CuentaCobroModel {
  /** id de la entidad */
  id: number;
  /** montoCobrar de la entidad */
  montoCobrar: number;
  /** fecha de la entidad */
  fecha: Date;
  /** estado de la entidad */
  estado: boolean;
  /** numeroCuenta de la entidad */
  numeroCuenta: string;
  /** detalle de la entidad */
  detalle: string;
  /** pago de la entidad */
  pago: boolean;
  /** notificacionPago de la entidad */
  notificacionPago: string;
  /** firmaGerente de la entidad */
  firmaGerente: any;
  /** firmaContratista de la entidad */
  firmaContratista: any;
  /** creador de la entidad */
  creador: string;
  /** contrato de la entidad */
  contrato: any;
  /** informe de la entidad */
  informe: any;
}

/**
 * Componente para la actualización de CuentaCobro
 * @description Maneja el formulario de actualización utilizando Formly
 */
@Component({
  selector: 'app-actualizar-cuentacobro',
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
  templateUrl: './actualizar-cuentacobro.component.html',
  styleUrls: ['./actualizar-cuentacobro.component.scss']
})
export class ActualizarCuentaCobroComponent implements OnInit {
  /** Lista de todas las entidades */
  cuentacobros: any[] = [];
  /** Lista de contrato disponibles */
  contratos: any[] = [];
  /** Lista de informe disponibles */
  informes: any[] = [];
  /** Entidad seleccionada para actualizar */
  selectedCuentaCobro: any = null;
  form = new FormGroup({});
  model: CuentaCobroModel = {} as CuentaCobroModel;
  originalModel: CuentaCobroModel = {} as CuentaCobroModel;
  fields: FormlyFieldConfig[] = [];
  /** Indicador de carga de archivos */
  isLoading = false;

  /**
   * Constructor del componente
   * @param cuentacobroService Servicio principal de la entidad
   * @param contratoService Servicio para gestionar Contrato
   * @param informeService Servicio para gestionar Informe
   * @param router Servicio de enrutamiento
   * @param snackBar Servicio para notificaciones
   * @param data Datos recibidos por el diálogo
   * @param dialogRef Referencia al diálogo
   */
  constructor(
    private cuentacobroService: CuentaCobroService,
    private contratoService: ContratoService,
    private informeService: InformeService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ActualizarCuentaCobroComponent>
  ) {}

  /** Inicialización del componente */
  ngOnInit() {
    this.loadCuentaCobros();
    this.loadContratoOptions();
    this.loadInformeOptions();

    // Verificamos si llega data a través del diálogo (registro para editar)
    if (this.data) {
      try {
        this.selectedCuentaCobro = { ...this.data };
        // Inicializar modelo con los datos recibidos
        this.model = {
          id: this.data.id,
          montoCobrar: this.data.montoCobrar,
          fecha: this.data.fecha,
          estado: this.data.estado,
          numeroCuenta: this.data.numeroCuenta,
          detalle: this.data.detalle,
          pago: this.data.pago,
          notificacionPago: this.data.notificacionPago,
          firmaGerente: this.data.firmaGerente,
          firmaContratista: this.data.firmaContratista,
          creador: this.data.creador,
          contrato: this.data.contrato && this.data.contrato.id ? this.data.contrato.id : null,
          informe: this.data.informe && this.data.informe.id ? this.data.informe.id : null
        };

        // Copia del modelo original para detectar cambios
        this.originalModel = {
          id: this.data.id,
          montoCobrar: this.data.montoCobrar,
          fecha: this.data.fecha,
          estado: this.data.estado,
          numeroCuenta: this.data.numeroCuenta,
          detalle: this.data.detalle,
          pago: this.data.pago,
          notificacionPago: this.data.notificacionPago,
          firmaGerente: this.data.firmaGerente,
          firmaContratista: this.data.firmaContratista,
          creador: this.data.creador,
          contrato: this.data.contrato && this.data.contrato.id ? this.data.contrato.id : null,
          informe: this.data.informe && this.data.informe.id ? this.data.informe.id : null
        };
      } catch (error) {
        console.error('Error al procesar datos:', error);
      }
    }
    this.generateFormFields();
  }

  /** Carga la lista de entidades disponibles */
  loadCuentaCobros() {
    this.cuentacobroService.findAll().subscribe(
      data => this.cuentacobros = data,
      error => console.error(error)
    );
  }

  /**
   * Carga las opciones para la relación Contrato
   * @private
   */
  private loadContratoOptions() {
    this.contratoService.findAll().subscribe(
      data => {
        this.contratos = data;
        this.updateFieldOptions('contrato', data);
      },
      error => console.error('Error al cargar contrato:', error)
    );
  }

  /**
   * Carga las opciones para la relación Informe
   * @private
   */
  private loadInformeOptions() {
    this.informeService.findAll().subscribe(
      data => {
        this.informes = data;
        this.updateFieldOptions('informe', data);
      },
      error => console.error('Error al cargar informe:', error)
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
  onEdit(cuentacobro: any) {
    this.selectedCuentaCobro = { ...cuentacobro };
    this.model = { ...this.selectedCuentaCobro };
    // Procesar relación simple: contrato
    if (this.model.contrato && typeof this.model.contrato === 'object') {
      this.model.contrato = this.model.contrato.id;
    }
    // Procesar relación simple: informe
    if (this.model.informe && typeof this.model.informe === 'object') {
      this.model.informe = this.model.informe.id;
    }
    this.generateFormFields();
  }

  /**
   * Genera la configuración de campos del formulario
   */
  generateFormFields() {
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
          options: [{ value: true, label: 'Activo' }, { value: false, label: 'Inactivo' }]
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
          accept: '.pdf,.doc,.docx'
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
          accept: '.pdf,.doc,.docx'
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
          attributes: {
            'class': 'modern-input'
          }
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
          labelProp: 'numeroContrato'
        }
      }
    ];
  }

  onSubmit() {
    // 1. Acciones previas
    this.preUpdate(this.model);

    const modelData = { ...this.model };

    this.isLoading = true;

    if (modelData.contrato) {
      modelData.contrato = { id: modelData.contrato };
    }

    if (modelData.informe) {
      modelData.informe = { id: modelData.informe };
    }


    const uploadOperations: Observable<void>[] = [];
    const fileFields: (keyof CuentaCobroModel)[] = ['firmaGerente', 'firmaContratista'];

    const handleFileUpload = (field: keyof CuentaCobroModel) => {
      const files = this.model[field];

      if (Array.isArray(files) && files.length > 0) {
        const upload$ = this.cuentacobroService.uploadFiles(files).pipe(
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
        const upload$ = this.cuentacobroService.uploadFile(files).pipe(
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
        next: () => this.updateEntity(modelData),
        error: () => this.isLoading = false
      });
    } else {
      this.updateEntity(modelData);
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

  private updateEntity(modelData: any) {
    this.cuentacobroService.update(modelData.id, modelData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.postUpdate(response);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al actualizar CuentaCobro:', error);
        this.snackBar.open('Error al actualizar CuentaCobro', 'Cerrar', {
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
  private hasChanges(model: CuentaCobroModel): boolean {
    for (const key in model) {
      const keyTyped = key as keyof CuentaCobroModel;
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
   * Método para acciones previas a actualizar CuentaCobro.
   */
  preUpdate(model: any) {
    // Verificar si el formulario es válido
    if (!this.form.valid) {
      throw new Error('El formulario no es válido.');
    }

    // Verificar si hubo cambios
    if (!this.hasChanges(model)) {
      this.snackBar.open('No se han realizado cambios en CuentaCobro.', 'Cerrar', {
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
   * Método para acciones posteriores al actualizar CuentaCobro.
   */
  postUpdate(response: any) {
    this.snackBar.open('CuentaCobro actualizado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postUpdate completadas.');
  }

}
