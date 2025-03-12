package Nomina.entity.repositories;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import java.util.List;
import java.util.Optional;
import Nomina.entity.entities.Contrato;
import Nomina.entity.entities.CuentaCobro;
import Nomina.entity.entities.Informe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repositorio JPA para la entidad CuentaCobro.
 * Proporciona operaciones CRUD básicas y métodos personalizados de búsqueda
 * basados en los atributos y relaciones de la entidad.
 */
@Repository
public interface CuentaCobroRepository extends JpaRepository<CuentaCobro, Long> {

    /**
     * Busca entidades CuentaCobro por su relación ManyToOne con Contrato.
     * @param contrato la entidad relacionada a buscar
     * @return Lista de entidades que cumplen con la relación
     */
    List<CuentaCobro> findByContrato(Contrato contrato);

    /**
     * Busca entidades CuentaCobro por su relación OneToOne con Informe.
     * @param informe la entidad relacionada a buscar
     * @return Lista de entidades que cumplen con la relación
     */
    List<CuentaCobro> findByInforme(Informe informe);

}
