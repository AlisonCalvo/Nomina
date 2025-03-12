package Nomina.entity.services.impl;

import java.util.List;
import java.util.Optional;
import Nomina.entity.dto.PersonaDTO;
import Nomina.entity.entities.Contrato;
import Nomina.entity.entities.Documento;
import Nomina.entity.entities.Persona;
import Nomina.entity.entities.Proyecto;
import Nomina.entity.entities.TipoDocumento;
import Nomina.entity.repositories.PersonaRepository;
import Nomina.entity.services.PersonaService;
import Nomina.seguridad.Interceptor.HibernateFilterActivator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementación del servicio {@link PersonaService} que proporciona
 * la lógica de negocio para gestionar entidades {@link Persona}.
 * <p>Esta implementación se encarga de la gestión completa del ciclo de vida de las entidades,
 * incluyendo operaciones CRUD y métodos de negocio específicos.</p>
 */
@Service
@Transactional
public class PersonaServiceImpl implements PersonaService {

@Autowired
private HibernateFilterActivator filterActivator;     /** Repositorio para acceder a los datos de la entidad */
    private final PersonaRepository repository;

    /**
     * Constructor que inicializa el servicio con su repositorio correspondiente.
     * @param repository Repositorio para la entidad Persona
     */
    @Autowired
    public PersonaServiceImpl(PersonaRepository repository) {
        this.repository = repository;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Persona> findAll() {
        filterActivator.activarFiltro(Persona.class);
        return repository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<Persona> findById(Long id) {
        return repository.findById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Persona save(PersonaDTO dto) {
        Persona entity = new Persona();
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
    public Persona update(long id, PersonaDTO dto) {
        Optional<Persona> optionalEntity = repository.findById(id);
        if (optionalEntity.isPresent()) {
            Persona entity = optionalEntity.get();
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
    public List<Persona> findByProyecto(Proyecto proyecto) {
        return repository.findByProyecto(proyecto);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Persona> findByContrato(Contrato contrato) {
        return repository.findByContrato(contrato);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Persona> findByDocumento(Documento documento) {
        return repository.findByDocumento(documento);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Persona> findByTipoDocumento(TipoDocumento tipoDocumento) {
        return repository.findByTipoDocumento(tipoDocumento);
    }

}
