package Nomina.entity.services.impl;
import java.util.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import Nomina.entity.dto.PersonaDTO;
import Nomina.entity.entities.*;
import Nomina.entity.repositories.PersonaRepository;
import Nomina.entity.services.PersonaService;
import Nomina.seguridad.Interceptor.HibernateFilterActivator;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
    private NotificacionEmailServiceImpl notificacionEmailService;

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
        Persona persona;

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

        // Si la persona necesita acceso, creamos el usuario y enviamos el correo
        if (dto.isNecesitaAcceso()) {
            String username = persona.getCorreo();
            String password = generarContrasena();

            Usuario usuario = new Usuario();
            usuario.setCorreo(username);
            usuario.setUsername(username);
            usuario.setPassword(password);
            usuario.setPersona(persona);
            usuario.setActivo(true);
            usuario.setName(persona.getNombre());

            if (dto.getRoles() == null || dto.getRoles().isEmpty()) {
                throw new IllegalArgumentException("Debe asignar al menos un rol al usuario.");
            }

            // Buscar roles en BD
            Set<Rol> roles = new HashSet<>();
            for (Long roleId : dto.getRoles()) {
                roleRepository.findById(roleId).ifPresent(roles::add);
            }
            usuario.setRoles(roles);

            // Guardar usuario en la base de datos
            usuarioRepository.save(usuario);

            // Enviar correo con credenciales
            enviarCorreoCredenciales(persona.getCorreo(), persona.getNombre(), username, password);
        }

        return persona;
    }

    /**
     * Método para enviar un correo con las credenciales del usuario
     */
    private void enviarCorreoCredenciales(String email, String nombre, String username, String password) {
        ObjectNode emailInfo = JsonNodeFactory.instance.objectNode();
        emailInfo.put("To", email);
        emailInfo.put("subject", "Credenciales de acceso al sistema");
        emailInfo.put("message", "Hola " + nombre +
                ",\n\nSe ha creado tu cuenta en el sistema.\n\nUsuario: " + username +
                "\nContraseña: " + password + "\n\n");

        try {
            CompletableFuture<String> future = notificacionEmailService.sendNotificationEmailAsync(
                    email, "Credenciales de acceso al sistema", emailInfo);
            String result = future.get(); // Esperamos la respuesta del email
            System.out.println("Correo enviado: " + result);
        } catch (Exception e) {
            System.err.println("Error al enviar correo: " + e.getMessage());
        }
    }

    /**
     * Método para generar una contraseña aleatoria
     */
    private String generarContrasena() {
        return UUID.randomUUID().toString().substring(0, 8);
    }



    /**
     * {@inheritDoc}
     */
    @Override
    public Persona update(long id, PersonaDTO dto) {
        // Buscar la persona en la base de datos
        Persona persona = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        // Verificar si el tipo de persona ha cambiado
        if (!persona.getClass().getSimpleName().equalsIgnoreCase(dto.getTipoPersona())) {
            // Si cambia el tipo de persona, se debe crear una nueva instancia
            switch (dto.getTipoPersona().toUpperCase()) {
                case "GERENTE":
                    persona = new Gerente();
                    ((Gerente) persona).setExperienciaProfesional(dto.getExperienciaProfesional());
                    break;
                case "CONTRATISTA":
                    persona = new Contratista();
                    ((Contratista) persona).setNumeroTarjetaProfesional(dto.getNumeroTarjetaProfesional());
                    ((Contratista) persona).setExperienciaProfesional(dto.getExperienciaProfesional());
                    ((Contratista) persona).setTelefonoAdicional(dto.getTelefonoAdicional());
                    ((Contratista) persona).setFirmaDigital(dto.getFirmaDigital());
                    break;
                case "CONTADOR":
                    persona = new Contador();
                    ((Contador) persona).setNumeroTarjetaProfesional(dto.getNumeroTarjetaProfesional());
                    break;
                default:
                    throw new IllegalArgumentException("Tipo de persona no válido: " + dto.getTipoPersona());
            }
        }

        // Actualizar los atributos comunes
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

        // Guardar la persona actualizada en la base de datos
        persona = repository.save(persona);

        // Si la persona necesita acceso, actualizar o crear el usuario asociado
        if (dto.isNecesitaAcceso()) {
            Usuario usuario = usuarioRepository.findByUsername(persona.getCorreo())
                    .orElseGet(() -> new Usuario());

            usuario.setCorreo(persona.getCorreo());
            usuario.setUsername(persona.getCorreo());
            usuario.setPersona(persona);
            usuario.setActivo(true);
            usuario.setName(persona.getNombre());

            if (dto.getRoles() == null || dto.getRoles().isEmpty()) {
                throw new IllegalArgumentException("Debe asignar al menos un rol al usuario.");
            }

            // Buscar y asignar roles
            Set<Rol> roles = new HashSet<>();
            for (Long roleId : dto.getRoles()) {
                roleRepository.findById(roleId).ifPresent(roles::add);
            }
            usuario.setRoles(roles);

            // Si es un usuario nuevo, generar una contraseña y enviarla por correo
            if (usuario.getPassword() == null) {
                String password = generarContrasena();
                usuario.setPassword(password);
                enviarCorreoCredenciales(persona.getCorreo(), persona.getNombre(), usuario.getUsername(), password);
            }

            usuarioRepository.save(usuario);
        }

        return persona;
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

