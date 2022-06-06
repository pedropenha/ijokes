package unoeste.fipp.silvio.webpiadas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unoeste.fipp.silvio.webpiadas.models.Categoria;
import unoeste.fipp.silvio.webpiadas.repositories.CategoriaRepository;

@RestController
@RequestMapping("/apis")
public class CategoriaRestController {

    @Autowired
    CategoriaRepository categoriaRepository;

    @GetMapping("/listar-with-filter")
    public ResponseEntity <Object> buscarTodos(String filtro)
    {
        List <Categoria> cats = categoriaRepository.findAllWithFilter(filtro);

        return new ResponseEntity<>(cats,HttpStatus.OK);
    }

    @GetMapping("/listar-id-cat")
    public ResponseEntity <Object> buscarOneId(Long id)
    {
        Categoria cats = categoriaRepository.findWithFilterID(id);

        return new ResponseEntity<>(cats,HttpStatus.OK);
    }

    @GetMapping("/listar-todas-categorias")
    public ResponseEntity<Object> buscarTodasCategorias(){
        List <Categoria> cats = categoriaRepository.findAll();
        System.out.println(cats);

        if(cats.size() == 0)
            return new ResponseEntity<>(cats, HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(cats, HttpStatus.OK);
    }

    @PostMapping("/cadastrar-categoria")
    public ResponseEntity<Object> cadastrarCategoria(@RequestBody Categoria categorias)
    {
        Categoria categoria = categoriaRepository.save(categorias);
        return new ResponseEntity<>(categoria, HttpStatus.OK);
    }

    @PostMapping("/delete-categoria")
    public ResponseEntity<Object> deletaCategory(Categoria categorias)
    {
        categoriaRepository.deleteById(categorias.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
