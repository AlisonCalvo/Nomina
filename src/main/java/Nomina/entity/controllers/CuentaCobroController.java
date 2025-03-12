package Nomina.entity.controllers;

import java.nio.file.Files;
import org.springframework.beans.factory.annotation.Autowired;
import Nomina.entity.services.impl.NotificacionEmailServiceImpl;
import java.io.IOException;
import Nomina.entity.dto.CuentaCobroDTO;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import java.util.List;
import Nomina.entity.services.CuentaCobroService;
import java.nio.file.Paths;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import Nomina.entity.entities.CuentaCobro;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.*;
import java.nio.file.Path;
import org.springframework.util.StringUtils;

/**
 * Controlador REST para la gestión de entidades CuentaCobro.
 * Proporciona endpoints para realizar operaciones CRUD sobre CuentaCobro.
 *
 * @RestController Marca esta clase como un controlador REST
 * @RequestMapping Define la ruta base para todos los endpoints
 */
@RestController
@RequestMapping("/api/cuentacobros")
public class CuentaCobroController {

    /**
     * Servicio que gestiona la lógica de negocio para CuentaCobro.
     */
    private final CuentaCobroService service;

    /**
     * Constructor que inyecta el servicio necesario para la gestión de CuentaCobro.
     *
     * @param service Servicio que implementa la lógica de negocio
     */
    @Autowired
    public CuentaCobroController(CuentaCobroService service) {
        this.service = service;
    }

    /**
     * Obtiene todas las entidades CuentaCobro disponibles.
     *
     * @return ResponseEntity con la lista de entidades si existen,
     *         o una lista vacía si no hay registros
     */
    @GetMapping
    public ResponseEntity<List<CuentaCobro>> findAll() {
        List<CuentaCobro> entities = service.findAll();
        return ResponseEntity.ok(entities);
    }

    /**
     * Busca una entidad CuentaCobro por su identificador.
     *
     * @param id Identificador único de la entidad
     * @return ResponseEntity con la entidad si existe,
     *         o ResponseEntity.notFound si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<CuentaCobro> findById(@PathVariable Long id) {
        Optional<CuentaCobro> entity = service.findById(id);
        return entity.map(ResponseEntity::ok).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Crea una nueva entidad CuentaCobro.
     *
     * @param dto DTO con los datos de la entidad a crear
     * @return ResponseEntity con la entidad creada y estado HTTP 201 (Created)
     */
    @PostMapping
    public ResponseEntity<CuentaCobro> save(@RequestBody CuentaCobroDTO dto) {
        CuentaCobro savedEntity = service.save(dto);
        return new ResponseEntity<>(savedEntity, HttpStatus.CREATED);
    }

    /**
     * Actualiza una entidad CuentaCobro existente.
     *
     * @param id Identificador de la entidad a actualizar
     * @param dto DTO con los nuevos datos de la entidad
     * @return ResponseEntity con la entidad actualizada,
     *         o ResponseEntity.notFound si la entidad no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<CuentaCobro> update(@PathVariable Long id, @RequestBody CuentaCobroDTO dto) {
        if (service.findById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        CuentaCobro updatedEntity = service.update(id, dto);
        return ResponseEntity.ok(updatedEntity);
    }

    /**
     * Elimina una entidad CuentaCobro por su identificador.
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

    /**
     * Sube uno o varios archivos al servidor local.
     *
     * @param files Lista de archivos a subir (MultipartFile)
     * @return ResponseEntity con la lista de rutas de archivo subidas,
     *         o un INTERNAL_SERVER_ERROR si ocurre un problema.
     */
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> files) {
        // Lista donde guardaremos las rutas resultantes de cada archivo
        List<String> filePaths = new ArrayList<>();

        String uploadDir = "uploads"; // Carpeta local donde se suben los archivos
        Path uploadPath = Paths.get(uploadDir);

        try {
            // Crear carpeta si no existe
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Guardar cada archivo
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String originalFilename = StringUtils.cleanPath(
                            Objects.requireNonNull(file.getOriginalFilename())
                    );
                    Path destinationFilePath = uploadPath.resolve(originalFilename);
                    Files.copy(file.getInputStream(), destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
                    // Agregamos la ruta donde quedó almacenado el archivo
                    filePaths.add(destinationFilePath.toString());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        // Retornamos las rutas de todos los archivos subidos
        return ResponseEntity.ok(filePaths);
    }

}
