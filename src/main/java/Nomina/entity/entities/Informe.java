/**
 * Informe.java
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
 * Entidad que representa informe en el sistema.
 * Esta clase es una entidad JPA que se mapea a la tabla correspondiente en la base de datos.
 *
 * @author EntityWriter
 * @version 1.0
 */
@Table(name="informe")
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Filter(name = "filtroCreador", condition = "creador = :creador")
public class Informe implements Serializable {

    /**
     * Identificador unico de la entidad. Este campo representa la clave primaria de la tabla en la base de datos.
     * 
     * Restricciones:
     */
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="informe_id", nullable=false)
    private long id;

    /**
     * contenido del informe
     * 
     * Restricciones:
     */
    @FilePath(type = "text")
    @Column(name="contenido", nullable=false)
    private String contenido;

    /**
     * fecha del informe
     * 
     * Restricciones:
     */
    @Temporal(TemporalType.DATE)
    @Column(name="fecha", nullable=false)
    private LocalDate fecha;

    /**
     * actividades del contratista
     * 
     * Restricciones:
     */
    @FilePath(type = "text")
    @Column(name="actividades", nullable=false)
    private String actividades;

    /**
     * cliente al que se realiza las actividades
     * 
     * Restricciones:
     */
    @Column(name="cliente", nullable=false)
    private String cliente;

    /**
     * cargo del contratista
     * 
     * Restricciones:
     */
    @Column(name="cargo", nullable=false)
    private String cargo;

    /**
     * Columna que representa el creador de la entidad.
     */
    @Column(name = "creador")
    private String creador;

    /**
     * 
     * Tipo de relación: One to One
     */
    @OneToOne
    private CuentaCobro cuentaCobro;

    /**
     * 
     * Tipo de relación: Many to One
     */
    @ManyToOne
	@JoinColumn(name = "proyecto")
    private Proyecto proyecto;

    /**
     * 
     * Tipo de relación: Many to One
     */
    @ManyToOne
	@JoinColumn(name = "contrato")
    private Contrato contrato;

    /**
     * Constructor con parámetros.
     * Inicializa una nueva instancia de Informe con los valores especificados.
     *
     * @param contenido contenido del informe
     * @param fecha fecha del informe
     * @param actividades actividades del contratista
     * @param cliente cliente al que se realiza las actividades
     * @param cargo cargo del contratista
     * @param cuentaCobro 
     * @param proyecto 
     * @param contrato 
     * @param creador Columna que representa el creador de la entidad.
     */
    public Informe(String contenido, LocalDate fecha, String actividades, String cliente, String cargo, CuentaCobro cuentaCobro, Proyecto proyecto, Contrato contrato, String creador) {
        this.contenido = contenido;
        this.fecha = fecha;
        this.actividades = actividades;
        this.cliente = cliente;
        this.cargo = cargo;
        this.cuentaCobro = cuentaCobro;
        this.proyecto = proyecto;
        this.contrato = contrato;
        this.creador = creador;
    }

}
