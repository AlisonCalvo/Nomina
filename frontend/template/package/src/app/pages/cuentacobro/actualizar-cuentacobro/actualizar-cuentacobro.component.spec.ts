// Importaciones de módulos de testing de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
// Importaciones del componente y servicio a probar
import { ActualizarCuentaCobroComponent } from "./actualizar-cuentacobro.component";
import { CuentaCobroService } from '../../../services/CuentaCobroService';

/**
 * Suite de pruebas para el componente ActualizarCuentacobro
 */
describe('ActualizarCuentacobroComponent', () => {
  // Variables para el componente y su fixture
  let component: ActualizarCuentaCobroComponent;
  let fixture: ComponentFixture<ActualizarCuentaCobroComponent>;

  /**
   * Configuración asíncrona del entorno de pruebas
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarCuentaCobroComponent ],
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
    fixture = TestBed.createComponent(ActualizarCuentaCobroComponent);
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
