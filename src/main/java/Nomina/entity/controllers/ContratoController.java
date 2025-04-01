package Nomina.entity.controllers;

import Nomina.entity.entities.CuentaCobro;
import org.springframework.http.HttpStatus;
import java.util.List;
import Nomina.entity.services.ContratoService;
import Nomina.entity.entities.Contrato;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import Nomina.entity.services.impl.NotificacionEmailServiceImpl;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.*;
import Nomina.entity.dto.ContratoDTO;

/**
 * Controlador REST para la gestión de entidades Contrato.
 * Proporciona endpoints para realizar operaciones CRUD sobre Contrato.
 *
 * @RestController Marca esta clase como un controlador REST
 * @RequestMapping Define la ruta base para todos los endpoints
 */
@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    /**
     * Servicio que gestiona la lógica de negocio para Contrato.
     */
    private final ContratoService service;

    /**
     * Constructor que inyecta el servicio necesario para la gestión de Contrato.
     *
     * @param service Servicio que implementa la lógica de negocio
     */
    @Autowired
    public ContratoController(ContratoService service) {
        this.service = service;
    }

    /**
     * Obtiene todas las entidades Contrato disponibles.
     *
     * @return ResponseEntity con la lista de entidades si existen,
     * o una lista vacía si no hay registros
     */
    @GetMapping
    public ResponseEntity<List<Contrato>> findAll() {
        List<Contrato> entities = service.findAll();
        return ResponseEntity.ok(entities);
    }

    /**
     * Busca una entidad Contrato por su identificador.
     *
     * @param id Identificador único de la entidad
     * @return ResponseEntity con la entidad si existe,
     * o ResponseEntity.notFound si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Contrato> findById(@PathVariable Long id) {
        Optional<Contrato> entity = service.findById(id);
        return entity.map(ResponseEntity::ok).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Crea una nueva entidad Contrato.
     *
     * @param dto DTO con los datos de la entidad a crear
     * @return ResponseEntity con la entidad creada y estado HTTP 201 (Created)
     */
    @PostMapping
    public ResponseEntity<Contrato> save(@RequestBody ContratoDTO dto) {
        Contrato savedEntity = service.save(dto);
        return new ResponseEntity<>(savedEntity, HttpStatus.CREATED);
    }

    /**
     * Actualiza una entidad Contrato existente.
     *
     * @param id  Identificador de la entidad a actualizar
     * @param dto DTO con los nuevos datos de la entidad
     * @return ResponseEntity con la entidad actualizada,
     * o ResponseEntity.notFound si la entidad no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<Contrato> update(@PathVariable Long id, @RequestBody ContratoDTO dto) {
        if (service.findById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Contrato updatedEntity = service.update(id, dto);
        return ResponseEntity.ok(updatedEntity);
    }

    /**
     * Elimina una entidad Contrato por su identificador.
     *
     * @param id Identificador de la entidad a eliminar
     * @return ResponseEntity con estado HTTP 204 (No Content) si se eliminó correctamente,
     * o ResponseEntity.notFound si la entidad no existe
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
    public ResponseEntity<List<Contrato>> obtenerContratosVisibles(@RequestParam Long usuarioId) {
        List<Contrato> contratos = service.obtenerContratosVisibles(usuarioId);
        return ResponseEntity.ok(contratos);
    }

    /**
     * Obtiene las cuentas de cobro asociadas a un contrato específico.
     *
     * @param contratoId Identificador del proyecto
     * @return ResponseEntity con la lista de personas asociadas al proyecto
     */
    @GetMapping("/{username}/{contratoId}/cuentascobro")
    public ResponseEntity<List<CuentaCobro>> obtenerCuentasCobroPorContrato(@PathVariable String username,@PathVariable Long contratoId) {
        List<CuentaCobro> cunetas = service.obtenerCuentasCobroPorContrato(username, contratoId);
        return ResponseEntity.ok(cunetas);
    }

}
