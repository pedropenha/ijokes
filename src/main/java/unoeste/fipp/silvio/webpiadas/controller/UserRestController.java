package unoeste.fipp.silvio.webpiadas.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
