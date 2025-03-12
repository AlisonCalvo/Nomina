package Nomina.entity.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.*;
import Nomina.entity.entities.*;

/**
 * DTO (Data Transfer Object) para la entidad Persona.
 * Esta clase se utiliza para transferir datos de Persona entre diferentes capas de la aplicación.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonaDTO {

    /**
     * Campo que representa nombre
     */
    private String nombre;

    /**
     * Campo que representa correo
     */
    private String correo;

    /**
     * Campo que representa numeroDocumento
     */
    private int numeroDocumento;

    /**
     * Campo que representa tituloProfesional
     */
    private String tituloProfesional;

    /**
     * Campo que representa direccion
     */
    private String direccion;

    /**
     * Campo que representa telefono
     */
    private int telefono;

    /**
     * Campo que representa fechaExpedicion
     */
    private LocalDate fechaExpedicion;

    /**
     * Campo que representa fechaNacimiento
     */
    private LocalDate fechaNacimiento;

    /**
     * Campo que representa nacionalidad
     */
    private String nacionalidad;

    /**
     * Representa la relación  con la entidad proyecto
     * Este campo representa una colección de elementos.
     */
    private List<Proyecto> proyecto;

    /**
     * Representa la relación  con la entidad contrato
     * Este campo representa una colección de elementos.
     */
    private List<Contrato> contrato;

    /**
     * Representa la relación  con la entidad documento
     * Este campo representa una colección de elementos.
     */
    private List<Documento> documento;

    /**
     * Representa la relación  con la entidad tipoDocumento
     */
    private TipoDocumento tipoDocumento;

    /**
     * Campo que representa el creador del registro.
     */
    private String creador;

}
