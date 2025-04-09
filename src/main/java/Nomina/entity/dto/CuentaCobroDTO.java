package Nomina.entity.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.*;
import Nomina.entity.entities.*;

/**
 * DTO (Data Transfer Object) para la entidad CuentaCobro.
 * Esta clase se utiliza para transferir datos de CuentaCobro entre diferentes capas de la aplicación.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CuentaCobroDTO {

    /**
     * Campo que representa montoCobrar
     */
    private long montoCobrar;

    /**
     * Campo que representa periodoACobrar
     */
    private String periodoACobrar;

    /**
     * Campo que representa fecha
     */
    private LocalDate fecha;

    /**
     * Campo que representa estado
     */
    private boolean estado;

    /**
     * Campo que representa numeroCuenta
     */
    private String numeroCuenta;

    /**
     * Campo que representa detalle
     */
    private String detalle;

    /**
     * Campo que representa pago
     */
    private boolean pago;

    /**
     * Campo que representa notificacionPago
     */
    private String notificacionPago;

    /**
     * Campo que representa firmaGerente
     */
    private String firmaGerente;

    /**
     * Campo que representa firmaContratista
     */
    private String firmaContratista;

    /**
     * Representa la relación  con la entidad contrato
     */
    private Contrato contrato;

    /**
     * Representa la relación  con la entidad informe
     */
    private Informe informe;

    /**
     * Campo que representa el creador del registro.
     */
    private String creador;

    /**
     * Campo que representa fechaAprobacion
     */
    private LocalDateTime fechaAprobacion;

}
