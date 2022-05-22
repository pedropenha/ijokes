package unoeste.fipp.silvio.webpiadas.controller;


import org.apache.catalina.User;
import org.aspectj.apache.bcel.classfile.Module.Uses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unoeste.fipp.silvio.webpiadas.models.Users;
import unoeste.fipp.silvio.webpiadas.repositories.UsersRepository;

import java.util.List;

@RestController
@RequestMapping("/apis")
public class UserRestController {

    @Autowired
    UsersRepository usersRepository;

    @PostMapping("/create-user")
    public ResponseEntity<Object> createUser(@RequestBody Users usuario)
    {
        Users user = usersRepository.save(usuario);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/list-all-user")
    public ResponseEntity <Object> buscarTodos(){
        List<Users> todos = usersRepository.findAll();
        return new ResponseEntity<>(todos,HttpStatus.OK);
    }

    @GetMapping("/list-one-user")
    public ResponseEntity <Object> bsucarFiltro(@RequestBody String usuario)
    {
        List <Users> cats = usersRepository.findAllWithFilter(usuario);

        return new ResponseEntity<>(cats,HttpStatus.OK);
    }

    @PostMapping("/atualiza-user")
    public ResponseEntity<Object> attUser (@RequestBody long id, String campo){
        Users user = usersRepository.getById(id);
        // falta fazer o repositorio para att usuario
        // fazer em aula

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/deleta-user")
    public ResponseEntity<Object> deleteUser (@RequestBody Long id){
        usersRepository.deleteById(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
