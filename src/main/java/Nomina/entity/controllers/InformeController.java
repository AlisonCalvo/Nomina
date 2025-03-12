package Nomina.entity.controllers;

import org.springframework.http.HttpStatus;
import java.util.List;
import Nomina.entity.services.InformeService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import Nomina.entity.entities.Informe;
import Nomina.entity.services.impl.NotificacionEmailServiceImpl;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.*;
import Nomina.entity.dto.InformeDTO;

/**
 * Controlador REST para la gestión de entidades Informe.
 * Proporciona endpoints para realizar operaciones CRUD sobre Informe.
 *
 * @RestController Marca esta clase como un controlador REST
 * @RequestMapping Define la ruta base para todos los endpoints
 */
@RestController
@RequestMapping("/api/informes")
public class InformeController {

    /**
     * Servicio que gestiona la lógica de negocio para Informe.
     */
    private final InformeService service;

    /**
     * Constructor que inyecta el servicio necesario para la gestión de Informe.
     *
     * @param service Servicio que implementa la lógica de negocio
     */
    @Autowired
    public InformeController(InformeService service) {
        this.service = service;
    }

    /**
     * Obtiene todas las entidades Informe disponibles.
     *
     * @return ResponseEntity con la lista de entidades si existen,
     *         o una lista vacía si no hay registros
     */
    @GetMapping
    public ResponseEntity<List<Informe>> findAll() {
        List<Informe> entities = service.findAll();
        return ResponseEntity.ok(entities);
    }

    /**
     * Busca una entidad Informe por su identificador.
     *
     * @param id Identificador único de la entidad
     * @return ResponseEntity con la entidad si existe,
     *         o ResponseEntity.notFound si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Informe> findById(@PathVariable Long id) {
        Optional<Informe> entity = service.findById(id);
        return entity.map(ResponseEntity::ok).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Crea una nueva entidad Informe.
     *
     * @param dto DTO con los datos de la entidad a crear
     * @return ResponseEntity con la entidad creada y estado HTTP 201 (Created)
     */
    @PostMapping
    public ResponseEntity<Informe> save(@RequestBody InformeDTO dto) {
        Informe savedEntity = service.save(dto);
        return new ResponseEntity<>(savedEntity, HttpStatus.CREATED);
    }

    /**
     * Actualiza una entidad Informe existente.
     *
     * @param id Identificador de la entidad a actualizar
     * @param dto DTO con los nuevos datos de la entidad
     * @return ResponseEntity con la entidad actualizada,
     *         o ResponseEntity.notFound si la entidad no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<Informe> update(@PathVariable Long id, @RequestBody InformeDTO dto) {
        if (service.findById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Informe updatedEntity = service.update(id, dto);
        return ResponseEntity.ok(updatedEntity);
    }

    /**
     * Elimina una entidad Informe por su identificador.
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

}
