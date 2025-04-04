// Importaciones de módulos de testing de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
// Importaciones del componente y servicio a probar
import { ActualizarCuentacobroComponent } from './actualizar-cuentacobro.component';
import { CuentaCobroService } from '../../../services/CuentaCobroService';

/**
 * Suite de pruebas para el componente ActualizarCuentacobro
 */
describe('ActualizarCuentacobroComponent', () => {
  // Variables para el componente y su fixture
  let component: ActualizarCuentacobroComponent;
  let fixture: ComponentFixture<ActualizarCuentacobroComponent>;

  /**
   * Configuración asíncrona del entorno de pruebas
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarCuentacobroComponent ],
      imports: [ 
        ReactiveFormsModule,      // Para manejo de formularios reactivos
        FormlyModule.forRoot()    // Para formularios dinámicos
      ],
      providers: [ CuentaCobroService ]  // Servicio necesario
    })
    .compileComponents();
  });

  /**
   * Creación y configuración del componente antes de cada test
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCuentacobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test básico para verificar la creación del componente
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
