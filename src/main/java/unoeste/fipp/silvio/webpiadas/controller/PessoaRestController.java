package unoeste.fipp.silvio.webpiadas.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.silvio.webpiadas.models.Pessoa;
import unoeste.fipp.silvio.webpiadas.repositories.PessoaRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/apis")
public class PessoaRestController {

    @Autowired
    PessoaRepository pessoaRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<Object> cadPessoa(@RequestBody Pessoa user)
    {
        return new ResponseEntity<>(pessoaRepository.save(user), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> userLogin)
    {
        Pessoa pessoa = pessoaRepository.login(userLogin.get("email"), userLogin.get("senha"));

        if(pessoa == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(pessoa, HttpStatus.OK);
    }

    @GetMapping("/list-all-user")
    public ResponseEntity <Object> buscarTodos()
    {
        List<Pessoa> todos = pessoaRepository.findAll();
        if(todos.size() > 0)
            return new ResponseEntity<>(todos,HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/list-one-user")
    public ResponseEntity <Object> buscarFiltro(@RequestParam String filtro)
    {
        List <Pessoa> pessoa = pessoaRepository.findAllWithFilter(filtro);

        if(pessoa.size() > 0)
            return new ResponseEntity<>(pessoa,HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/deleta-user")
    public ResponseEntity<Object> deleteUser (@RequestBody Pessoa pessoa)
    {
        Pessoa user = pessoaRepository.login(pessoa.getEmail(), pessoa.getSenha());

        pessoaRepository.deleteById(user.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
