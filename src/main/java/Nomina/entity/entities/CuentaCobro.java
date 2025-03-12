/**
 * CuentaCobro.java
 * Generado automáticamente el 12/03/2025 11:45:41
 */

package Nomina.entity.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import Nomina.entity.annotations.FilePath;
import lombok.*;
import java.util.*;
import java.math.*;
import java.time.*;
import java.io.Serializable;
import Nomina.seguridad.persistence.entities.Objeto;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

/**
 * Entidad que representa cuentacobro en el sistema.
 * Esta clase es una entidad JPA que se mapea a la tabla correspondiente en la base de datos.
 *
 * @author EntityWriter
 * @version 1.0
 */
@Table(name="cuentaCobro")
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Filter(name = "filtroCreador", condition = "creador = :creador")
public class CuentaCobro implements Serializable {

    /**
     * Identificador unico de la entidad. Este campo representa la clave primaria de la tabla en la base de datos.
     * 
     * Restricciones:
     */
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cuentaCobro_id", nullable=false)
    private long id;

    /**
     * monto a cobrar 
     * 
     * Restricciones:
     */
    @Column(name="montoCobrar", nullable=false)
    private long montoCobrar;

    /**
     * fecha de entrega de la cuenta de cobro
     * 
     * Restricciones:
     */
    @Temporal(TemporalType.DATE)
    @Column(name="fecha", nullable=false)
    private LocalDate fecha;

    /**
     * estado de la cuenta de cobro
     * 
     * Restricciones:
     */
    @Column(name="estado", nullable=false)
    private boolean estado;

    /**
     * numero de la cuenta bancaria del contratista
     * 
     * Restricciones:
     */
    @Column(name="numeroCuenta", nullable=false)
    private String numeroCuenta;

    /**
     * detalle de las actividades realizadas por el contratista
     * 
     * Restricciones:
     */
    @FilePath(type = "text")
    @Column(name="detalle", nullable=false)
    private String detalle;

    /**
     * booleano que indica si se realiza el pago o no
     * 
     * Restricciones:
     */
    @Column(name="pago", nullable=false)
    private boolean pago;

    /**
     * notificacion de cuando se realiza el pago
     * 
     * Restricciones:
     */
    @Column(name="notificacionPago")
    private String notificacionPago;

    /**
     * firma del gerente que contrata
     * 
     * Restricciones:
     */
    @FilePath(type = "file")
    @Column(name="firmaGerente")
    private String firmaGerente;

    /**
     * firma del contratista
     * 
     * Restricciones:
     */
    @FilePath(type = "file")
    @Column(name="firmaContratista")
    private String firmaContratista;

    /**
     * Columna que representa el creador de la entidad.
     */
    @Column(name = "creador")
    private String creador;

    /**
     * 
     * Tipo de relación: Many to One
     */
    @ManyToOne
	@JoinColumn(name = "contrato")
    private Contrato contrato;

    /**
     * 
     * Tipo de relación: One to One
     */
    @OneToOne(mappedBy = "cuentaCobro" )@JsonIgnore
    private Informe informe;

    /**
     * Constructor con parámetros.
     * Inicializa una nueva instancia de CuentaCobro con los valores especificados.
     *
     * @param montoCobrar monto a cobrar 
     * @param fecha fecha de entrega de la cuenta de cobro
     * @param estado estado de la cuenta de cobro
     * @param numeroCuenta numero de la cuenta bancaria del contratista
     * @param detalle detalle de las actividades realizadas por el contratista
     * @param pago booleano que indica si se realiza el pago o no
     * @param notificacionPago notificacion de cuando se realiza el pago
     * @param firmaGerente firma del gerente que contrata
     * @param firmaContratista firma del contratista
     * @param contrato 
     * @param informe 
     * @param creador Columna que representa el creador de la entidad.
     */
    public CuentaCobro(long montoCobrar, LocalDate fecha, boolean estado, String numeroCuenta, String detalle, boolean pago, String notificacionPago, String firmaGerente, String firmaContratista, Contrato contrato, Informe informe, String creador) {
        this.montoCobrar = montoCobrar;
        this.fecha = fecha;
        this.estado = estado;
        this.numeroCuenta = numeroCuenta;
        this.detalle = detalle;
        this.pago = pago;
        this.notificacionPago = notificacionPago;
        this.firmaGerente = firmaGerente;
        this.firmaContratista = firmaContratista;
        this.contrato = contrato;
        this.informe = informe;
        this.creador = creador;
    }

}
