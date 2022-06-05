package unoeste.fipp.silvio.webpiadas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        System.out.println(filtro);
        List <Categoria> cats = categoriaRepository.findAllWithFilter(filtro);

        return new ResponseEntity<>(cats,HttpStatus.CREATED);
    }

    @PostMapping("/cadastrar-categoria")
    public ResponseEntity<Object> cadastrarCategoria(Categoria categorias)
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
