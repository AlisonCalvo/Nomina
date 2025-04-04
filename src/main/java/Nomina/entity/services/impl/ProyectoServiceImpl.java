package Nomina.entity.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import Nomina.entity.dto.ProyectoDTO;
import Nomina.entity.entities.*;
import Nomina.entity.repositories.ContratoRepository;
import Nomina.entity.repositories.ProyectoRepository;
import Nomina.entity.services.ProyectoService;
import Nomina.seguridad.Interceptor.HibernateFilterActivator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementación del servicio {@link ProyectoService} que proporciona
 * la lógica de negocio para gestionar entidades {@link Proyecto}.
 * <p>Esta implementación se encarga de la gestión completa del ciclo de vida de las entidades,
 * incluyendo operaciones CRUD y métodos de negocio específicos.</p>
 */
@Service
@Transactional
public class ProyectoServiceImpl implements ProyectoService {

@Autowired
private HibernateFilterActivator filterActivator;     /** Repositorio para acceder a los datos de la entidad */
    private final ProyectoRepository repository;

    /**
     * Constructor que inicializa el servicio con su repositorio correspondiente.
     * @param repository Repositorio para la entidad Proyecto
     */
    @Autowired
    public ProyectoServiceImpl(ProyectoRepository repository, ContratoRepository repositoryContrato) {
        this.repository = repository;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Proyecto> findAll() {
        filterActivator.activarFiltro(Proyecto.class);
        return repository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<Proyecto> findById(Long id) {
        return repository.findById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Proyecto save(ProyectoDTO dto) {
        Proyecto entity = new Proyecto();
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
    public Proyecto update(long id, ProyectoDTO dto) {
        Optional<Proyecto> optionalEntity = repository.findById(id);
        if (optionalEntity.isPresent()) {
            Proyecto entity = optionalEntity.get();
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
    public List<Proyecto> findByPersona(Persona persona) {
        return repository.findByPersona(persona);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Proyecto> findByContrato(Contrato contrato) {
        return repository.findByContrato(contrato);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Proyecto> findByInforme(Informe informe) {
        return repository.findByInforme(informe);
    }

    @Override
    public List<Proyecto> obtenerProyectosVisibles(Long personaId) {
        return repository.findByPersonaId(personaId);
    }

    @Override
    public List<Persona> obtenerPersonasPorProyecto(Long proyectoId) {
        // Buscar el proyecto primero
        Optional<Proyecto> proyectoOptional = repository.findById(proyectoId);

        if (proyectoOptional.isPresent()) {
            Proyecto proyecto = proyectoOptional.get();
            // Devolver las personas asociadas al proyecto
            return proyecto.getPersona();
        }

        // Devolver lista vacía si no se encuentra el proyecto
        return new ArrayList<>();
    }

    @Override
    public List<Contrato> obtenerContratosPorProyecto(Long personaId, Long proyectoId) {
        // Buscar el proyecto específico por ID
        Optional<Proyecto> proyectoOptional = repository.findById(proyectoId);

        if (proyectoOptional.isPresent()) {
            Proyecto proyecto = proyectoOptional.get();

            // Filtrar los contratos donde la persona está relacionada
            return proyecto.getContrato().stream()
                    .filter(contrato -> contrato.getPersona().getId() == personaId)
                    .collect(Collectors.toList());
        }

        // Si el proyecto no existe, devolver una lista vacía
        return new ArrayList<>();
    }

}


