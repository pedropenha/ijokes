package unoeste.fipp.silvio.webpiadas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unoeste.fipp.silvio.webpiadas.models.Pessoa;
import unoeste.fipp.silvio.webpiadas.models.Piada;
import unoeste.fipp.silvio.webpiadas.repositories.PiadaRepository;

@RestController
@RequestMapping("/apis")
public class PiadaRestController {
    
    @Autowired
    PiadaRepository piadaRepository; 
    
    @GetMapping("/listar-todas-piadas")
    public ResponseEntity <Object> buscarTodas()
    {
        List<Piada> piadas = piadaRepository.findAll();
        return new ResponseEntity<>(piadas,HttpStatus.OK);
    }

    @GetMapping("/listar-piadas-filtro")
    public ResponseEntity <Object> buscarComFiltro(String filter)
    {
        List<Piada> piadas = piadaRepository.findWithFilter(filter);
        return new ResponseEntity<>(piadas,HttpStatus.OK);
    }

    @PostMapping("/cadastrar-piada")
    public ResponseEntity<Object> cadastraPiada(@RequestBody Piada piadas)
    {
        return new ResponseEntity<>(piadaRepository.save(piadas), HttpStatus.OK);
    }

    @PostMapping("/delete-piada")
    public ResponseEntity<Object> deletePiada(@RequestBody Piada piadas)
    {
        piadaRepository.deleteById(piadas.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/edit-piada")
    public ResponseEntity<Object> editPiada(@RequestBody Piada piadas)
    {
        Piada piada = piadaRepository.editPiada(piadas.getTitulo(), piadas.getTexto(), piadas.getKeywords(), piadas.getCategoria().getId());
        return new ResponseEntity<>(piada, HttpStatus.OK);
    }
}
