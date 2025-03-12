package Nomina.entity.services.impl;

import java.util.List;
import java.util.Optional;
import Nomina.entity.dto.CuentaCobroDTO;
import Nomina.entity.entities.Contrato;
import Nomina.entity.entities.CuentaCobro;
import Nomina.entity.entities.Informe;
import Nomina.entity.repositories.CuentaCobroRepository;
import Nomina.entity.services.CuentaCobroService;
import Nomina.seguridad.Interceptor.HibernateFilterActivator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementación del servicio {@link CuentaCobroService} que proporciona
 * la lógica de negocio para gestionar entidades {@link CuentaCobro}.
 * <p>Esta implementación se encarga de la gestión completa del ciclo de vida de las entidades,
 * incluyendo operaciones CRUD y métodos de negocio específicos.</p>
 */
@Service
@Transactional
public class CuentaCobroServiceImpl implements CuentaCobroService {

@Autowired
private HibernateFilterActivator filterActivator;     /** Repositorio para acceder a los datos de la entidad */
    private final CuentaCobroRepository repository;

    /**
     * Constructor que inicializa el servicio con su repositorio correspondiente.
     * @param repository Repositorio para la entidad CuentaCobro
     */
    @Autowired
    public CuentaCobroServiceImpl(CuentaCobroRepository repository) {
        this.repository = repository;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<CuentaCobro> findAll() {
        filterActivator.activarFiltro(CuentaCobro.class);
        return repository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<CuentaCobro> findById(Long id) {
        return repository.findById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CuentaCobro save(CuentaCobroDTO dto) {
        CuentaCobro entity = new CuentaCobro();
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
    public CuentaCobro update(long id, CuentaCobroDTO dto) {
        Optional<CuentaCobro> optionalEntity = repository.findById(id);
        if (optionalEntity.isPresent()) {
            CuentaCobro entity = optionalEntity.get();
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
    public List<CuentaCobro> findByContrato(Contrato contrato) {
        return repository.findByContrato(contrato);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<CuentaCobro> findByInforme(Informe informe) {
        return repository.findByInforme(informe);
    }

}
