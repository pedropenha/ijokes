package unoeste.fipp.silvio.webpiadas.controller;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unoeste.fipp.silvio.webpiadas.models.Categoria;
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
        List<Piada> piadas = piadaRepository.findWithFilter("");
        return new ResponseEntity<>(piadas,HttpStatus.OK);
    }


    @GetMapping("/vota-ranking")
    public ResponseEntity<Object> atualizaRanking(String id)
    {
        Piada piada = piadaRepository.findByIdPiada(Long.parseLong(id));
        piada.setRanking(piada.getRanking()+1);
        piada = piadaRepository.save(piada);
        return new ResponseEntity<>(piada,HttpStatus.OK);
    }

    @GetMapping("/listar-piadas-filtro")
    public ResponseEntity <Object> buscarComFiltro(String filter)
    {
        List<Piada> piadas = piadaRepository.findWithFilter(filter);
        return new ResponseEntity<>(piadas,HttpStatus.OK);
    }

    @GetMapping("/listar-piadas-usuario")
    public ResponseEntity<Object> buscarPiadaUsuario(String id)
    {
        List<Piada> piadas = piadaRepository.findWithId(Long.parseLong(id));
        return new ResponseEntity<>(piadas, HttpStatus.OK);
    }

    @PostMapping("/listar-piadas-categoria")
    public ResponseEntity<Object> buscarPiadasCategoria(@RequestBody Categoria categoria){
        return new ResponseEntity<>(piadaRepository.findWithCat(categoria.getId()), HttpStatus.OK);
    }

    @PostMapping("/cadastrar-piada")
    public ResponseEntity<Object> cadastraPiada(@RequestBody Piada piadas)
    {
        return new ResponseEntity<>(piadaRepository.save(piadas), HttpStatus.OK);
    }

    @GetMapping("/delete-piada")
    public ResponseEntity<Object> deletePiada(String id)
    {
        Piada piadas = piadaRepository.findByIdPiada(Long.parseLong(id));
        piadaRepository.delete(piadas);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
