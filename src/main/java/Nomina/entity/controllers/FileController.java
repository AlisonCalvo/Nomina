package Nomina.entity.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    // Puedes inyectar un servicio que obtenga los nombres desde la BD o desde la carpeta 'uploads'
    @GetMapping
    public ResponseEntity<List<String>> getFileList() {
        // Ejemplo: se obtiene la lista de archivos de la carpeta "uploads"
        File folder = new File("uploads");
        String[] filesArray = folder.list();
        List<String> files = filesArray != null ? Arrays.asList(filesArray) : new ArrayList<>();
        return ResponseEntity.ok(files);
    }

    // Endpoint para descargar un archivo
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam("file") String fileName) throws MalformedURLException {
        Path filePath = Paths.get("uploads").resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
}
