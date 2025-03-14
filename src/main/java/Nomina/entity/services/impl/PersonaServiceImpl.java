package Nomina.entity.services.impl;
import java.util.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import Nomina.entity.dto.PersonaDTO;
import Nomina.entity.entities.*;
import Nomina.entity.repositories.PersonaRepository;
import Nomina.entity.services.PersonaService;
import Nomina.seguridad.Interceptor.HibernateFilterActivator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Nomina.seguridad.Interceptor.HibernateFilterActivator;
import Nomina.seguridad.persistence.entities.Rol;
import Nomina.seguridad.persistence.entities.Usuario;
import Nomina.seguridad.persistence.repository.RoleRepository;
import Nomina.seguridad.persistence.repository.UserRepository;
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
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PersonaRepository personaRepository;

    /**
     * Constructor que inicializa el servicio con su repositorio correspondiente.
     * @param repository Repositorio para la entidad Persona
     */
    @Autowired
    public PersonaServiceImpl(PersonaRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private UserRepository usuarioRepository;

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
    @Transactional
    public Persona save(PersonaDTO dto) {
        Persona persona = new Persona();

        // Crear la subclase correcta y asignar atributos específicos
        switch (dto.getTipoPersona().toUpperCase()) {
            case "GERENTE":
                Gerente gerente = new Gerente();
                gerente.setExperienciaProfesional(dto.getExperienciaProfesional());
                persona = gerente;
                break;
            case "CONTRATISTA":
                Contratista contratista = new Contratista();
                contratista.setNumeroTarjetaProfesional(dto.getNumeroTarjetaProfesional());
                contratista.setExperienciaProfesional(dto.getExperienciaProfesional());
                contratista.setTelefonoAdicional(dto.getTelefonoAdicional());
                contratista.setFirmaDigital(dto.getFirmaDigital());
                persona = contratista;
                break;
            case "CONTADOR":
                Contador contador = new Contador();
                contador.setNumeroTarjetaProfesional(dto.getNumeroTarjetaProfesional());
                persona = contador;
                break;
            default:
                throw new IllegalArgumentException("Tipo de persona no válido: " + dto.getTipoPersona());
        }

        persona.setNombre(dto.getNombre());
        persona.setCorreo(dto.getCorreo());
        persona.setNumeroDocumento(dto.getNumeroDocumento());
        persona.setTituloProfesional(dto.getTituloProfesional());
        persona.setDireccion(dto.getDireccion());
        persona.setTelefono(dto.getTelefono());
        persona.setFechaExpedicion(dto.getFechaExpedicion());
        persona.setFechaNacimiento(dto.getFechaNacimiento());
        persona.setNacionalidad(dto.getNacionalidad());
        persona.setTipoDocumento(dto.getTipoDocumento());
        persona.setCreador(dto.getCreador());

        // Guardar persona en la base de datos
        persona = personaRepository.save(persona);

        // Si la persona necesita acceso, creamos el usuario
        if (dto.isNecesitaAcceso()) {
            Usuario usuario = new Usuario();
            usuario.setCorreo(persona.getCorreo());
            usuario.setUsername(persona.getCorreo());
            usuario.setPassword(generarContrasena());
            usuario.setPersona(persona);
            usuario.setActivo(true);
            usuario.setName(persona.getNombre());

            if (dto.getRoles() == null || dto.getRoles().isEmpty()) {
                throw new IllegalArgumentException("Debe asignar al menos un rol al usuario.");
            }

            // Log para ver los IDs recibidos
            System.out.println("IDs de roles recibidos: " + dto.getRoles());

            // Buscar roles en BD
            Set<Rol> roles = new HashSet<>();
            if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
                for (Long roleId : dto.getRoles()) {
                    roleRepository.findById(roleId).ifPresent(roles::add);
                }
            }
            usuario.setRoles(roles);

            // Log para ver los roles encontrados
            System.out.println("Roles encontrados en BD: " + roles);

            usuario.setRoles(roles);

            usuarioRepository.save(usuario);
        }

        return persona;
    }


    private String generarContrasena() {
        return UUID.randomUUID().toString().substring(0, 8); // Genera una contraseña aleatoria de 8 caracteres
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
