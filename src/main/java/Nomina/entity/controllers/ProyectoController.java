package Nomina.entity.controllers;

import Nomina.entity.entities.Contrato;
import Nomina.entity.entities.Persona;
import org.springframework.http.HttpStatus;
import Nomina.entity.dto.ProyectoDTO;
import java.util.List;
import Nomina.entity.entities.Proyecto;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import Nomina.entity.services.impl.NotificacionEmailServiceImpl;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.*;
import Nomina.entity.services.ProyectoService;

/**
 * Controlador REST para la gestión de entidades Proyecto.
 * Proporciona endpoints para realizar operaciones CRUD sobre Proyecto.
 *
 * @RestController Marca esta clase como un controlador REST
 * @RequestMapping Define la ruta base para todos los endpoints
 */
@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {

    /**
     * Servicio que gestiona la lógica de negocio para Proyecto.
     */
    private final ProyectoService service;

    /**
     * Constructor que inyecta el servicio necesario para la gestión de Proyecto.
     *
     * @param service Servicio que implementa la lógica de negocio
     */
    @Autowired
    public ProyectoController(ProyectoService service) {
        this.service = service;
    }

    /**
     * Obtiene todas las entidades Proyecto disponibles.
     *
     * @return ResponseEntity con la lista de entidades si existen,
     *         o una lista vacía si no hay registros
     */
    @GetMapping
    public ResponseEntity<List<Proyecto>> findAll() {
        List<Proyecto> entities = service.findAll();
        return ResponseEntity.ok(entities);
    }

    /**
     * Busca una entidad Proyecto por su identificador.
     *
     * @param id Identificador único de la entidad
     * @return ResponseEntity con la entidad si existe,
     *         o ResponseEntity.notFound si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> findById(@PathVariable Long id) {
        Optional<Proyecto> entity = service.findById(id);
        return entity.map(ResponseEntity::ok).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Crea una nueva entidad Proyecto.
     *
     * @param dto DTO con los datos de la entidad a crear
     * @return ResponseEntity con la entidad creada y estado HTTP 201 (Created)
     */
    @PostMapping
    public ResponseEntity<Proyecto> save(@RequestBody ProyectoDTO dto) {
        Proyecto savedEntity = service.save(dto);
        return new ResponseEntity<>(savedEntity, HttpStatus.CREATED);
    }

    /**
     * Actualiza una entidad Proyecto existente.
     *
     * @param id Identificador de la entidad a actualizar
     * @param dto DTO con los nuevos datos de la entidad
     * @return ResponseEntity con la entidad actualizada,
     *         o ResponseEntity.notFound si la entidad no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<Proyecto> update(@PathVariable Long id, @RequestBody ProyectoDTO dto) {
        if (service.findById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Proyecto updatedEntity = service.update(id, dto);
        return ResponseEntity.ok(updatedEntity);
    }

    /**
     * Elimina una entidad Proyecto por su identificador.
     *
     * @param id Identificador de la entidad a eliminar
     * @return ResponseEntity con estado HTTP 204 (No Content) si se eliminó correctamente,
     *         o ResponseEntity.notFound si la entidad no existe
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        if (service.findById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/visibles")
    public ResponseEntity<List<Proyecto>> obtenerProyectosVisibles(@RequestParam Long personaId) {
        List<Proyecto> proyectos = service.obtenerProyectosVisibles(personaId);
        return ResponseEntity.ok(proyectos);
    }

    /**
     * Obtiene las personas asociadas a un proyecto específico.
     *
     * @param proyectoId Identificador del proyecto
     * @return ResponseEntity con la lista de personas asociadas al proyecto
     */
    @GetMapping("/{proyectoId}/personas")
    public ResponseEntity<List<Persona>> obtenerPersonasPorProyecto(@PathVariable Long proyectoId) {
        List<Persona> personas = service.obtenerPersonasPorProyecto(proyectoId);
        return ResponseEntity.ok(personas);
    }


    /**
     * Obtiene los contratos asociados a un proyecto específico.
     *
     * @param personaId Identificador del contrato
     * @return ResponseEntity con la lista de contratos asociados al proyecto
     */
    @GetMapping("/{personaId}/{proyectoId}/contratos")
    public ResponseEntity<List<Contrato>> obtenerContratosVisibles(
            @PathVariable Long personaId,
            @PathVariable Long proyectoId) {

        List<Contrato> contratos = service.obtenerContratosPorProyecto(personaId, proyectoId);
        return ResponseEntity.ok(contratos);
    }


}
