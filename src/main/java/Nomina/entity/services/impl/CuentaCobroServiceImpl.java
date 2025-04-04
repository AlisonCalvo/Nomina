package Nomina.entity.services.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import Nomina.entity.dto.CuentaCobroDTO;
import Nomina.entity.entities.Contrato;
import Nomina.entity.entities.CuentaCobro;
import Nomina.entity.entities.Informe;
import Nomina.entity.entities.Persona;
import Nomina.entity.repositories.CuentaCobroRepository;
import Nomina.entity.services.CuentaCobroService;
import Nomina.seguridad.Interceptor.HibernateFilterActivator;
import Nomina.seguridad.Interceptor.SecurityContextPersonalizado;
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

    @Autowired
    private SecurityContextPersonalizado securityContextPersonalizado;

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

    public List<CuentaCobro> findAll() {
        String usuarioActual = securityContextPersonalizado.getUsuarioActual();
        boolean esContador = securityContextPersonalizado.isEsContador();

        // Verificar si el usuario tiene rol ADMINISTRADOR o GERENTE
        List<String> rolesUsuario = securityContextPersonalizado.getRoles();
        boolean esAdminGerente = rolesUsuario.contains("ADMINISTRADOR") || rolesUsuario.contains("GERENTE");

        // Si es ADMINISTRADOR o GERENTE, devolver todas las cuentas
        if (esAdminGerente) {
            filterActivator.activarFiltro(Persona.class);
            return repository.findAll();
        }

        //Si no es ADMIN/GERENTE, aplicar filtros
       return repository.findByUsuario(usuarioActual, esContador, esAdminGerente);
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
        Optional<CuentaCobro> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException("CuentaCobro no encontrada con id: " + id);


            //Se guardan ahora como imagenes en un base64 en la base de datos,
            // entonces ya no se requiere eliminacion de archivos
//        CuentaCobro entity = optional.get();
//
//        List<String> filePaths = new ArrayList<>();
//
//        if (entity.getFirmaContratista() != null) {
//            String[] contratistaPaths = entity.getFirmaContratista().split(",");
//            for (String path : contratistaPaths) {
//                path = path.trim();
//                if (!path.isEmpty()) {
//                    filePaths.add(path);
//                }
//            }
//        }
//
//        if (entity.getFirmaGerente() != null) {
//            String[] gerentePaths = entity.getFirmaGerente().split(",");
//            for (String path : gerentePaths) {
//                path = path.trim();
//                if (!path.isEmpty()) {
//                    filePaths.add(path);
//                }
//            }
//        }
//
//        for (String filePathString : filePaths) {
//            try {
//                Path filePath = Path.of(filePathString).toAbsolutePath().normalize();
//                Path uploadsDir = Path.of("uploads").toAbsolutePath().normalize();
//                if (filePath.startsWith(uploadsDir)) {
//
//                    Files.deleteIfExists(filePath);
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
        }
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
