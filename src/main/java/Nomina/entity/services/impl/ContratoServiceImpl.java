package Nomina.entity.services.impl;

import java.util.List;
import java.util.Optional;
import Nomina.entity.dto.ContratoDTO;
import Nomina.entity.entities.Contrato;
import Nomina.entity.entities.CuentaCobro;
import Nomina.entity.entities.Documento;
import Nomina.entity.entities.Informe;
import Nomina.entity.entities.PeriodicidadPago;
import Nomina.entity.entities.Persona;
import Nomina.entity.entities.Proyecto;
import Nomina.entity.entities.TipoContrato;
import Nomina.entity.repositories.ContratoRepository;
import Nomina.entity.services.ContratoService;
import Nomina.seguridad.Interceptor.HibernateFilterActivator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementación del servicio {@link ContratoService} que proporciona
 * la lógica de negocio para gestionar entidades {@link Contrato}.
 * <p>Esta implementación se encarga de la gestión completa del ciclo de vida de las entidades,
 * incluyendo operaciones CRUD y métodos de negocio específicos.</p>
 */
@Service
@Transactional
public class ContratoServiceImpl implements ContratoService {

@Autowired
private HibernateFilterActivator filterActivator;     /** Repositorio para acceder a los datos de la entidad */
    private final ContratoRepository repository;

    /**
     * Constructor que inicializa el servicio con su repositorio correspondiente.
     * @param repository Repositorio para la entidad Contrato
     */
    @Autowired
    public ContratoServiceImpl(ContratoRepository repository) {
        this.repository = repository;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Contrato> findAll() {
        filterActivator.activarFiltro(Contrato.class);
        return repository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<Contrato> findById(Long id) {
        return repository.findById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Contrato save(ContratoDTO dto) {
        Contrato entity = new Contrato();
        for (java.lang.reflect.Field field : dto.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            try {
                java.lang.reflect.Field entityField = entity.getClass().getDeclaredField(field.getName());
                entityField.setAccessible(true);
                entityField.set(entity, field.get(dto));
            } catch (NoSuchFieldException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return repository.save(entity);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Contrato update(long id, ContratoDTO dto) {
        Optional<Contrato> optionalEntity = repository.findById(id);
        if (optionalEntity.isPresent()) {
            Contrato entity = optionalEntity.get();
            for (java.lang.reflect.Field field : dto.getClass().getDeclaredFields()) {
                field.setAccessible(true);
                try {
                    java.lang.reflect.Field entityField = entity.getClass().getDeclaredField(field.getName());
                    entityField.setAccessible(true);
                    entityField.set(entity, field.get(dto));
                } catch (NoSuchFieldException | IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
            return repository.save(entity);
        } else {
            throw new RuntimeException("Entity not found");
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Contrato> findByProyecto(Proyecto proyecto) {
        return repository.findByProyecto(proyecto);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Contrato> findByPersona(Persona persona) {
        return repository.findByPersona(persona);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Contrato> findByDocumento(Documento documento) {
        return repository.findByDocumento(documento);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Contrato> findByCuentaCobro(CuentaCobro cuentaCobro) {
        return repository.findByCuentaCobro(cuentaCobro);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Contrato> findByTipoContrato(TipoContrato tipoContrato) {
        return repository.findByTipoContrato(tipoContrato);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Contrato> findByPeriodicidadPago(PeriodicidadPago periodicidadPago) {
        return repository.findByPeriodicidadPago(periodicidadPago);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Contrato> findByInforme(Informe informe) {
        return repository.findByInforme(informe);
    }

}
