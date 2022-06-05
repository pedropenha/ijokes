package unoeste.fipp.silvio.webpiadas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.silvio.webpiadas.models.Pessoa;

import java.util.List;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

    @Query(value="SELECT * FROM pessoa p WHERE p.nome LIKE :filter%",nativeQuery=true)
    public List<Pessoa> findAllWithFilter(@Param("filter") String filter);

    @Query(value="SELECT * FROM PESSOA P WHERE P.EMAIL = :email AND P.SENHA = :senha", nativeQuery = true)
    public Pessoa login(@Param("email") String email, @Param("senha") String senha);

    @Query(value="DELETE FROM PESSOA WHERE id = :id", nativeQuery = true)
    public void deleteById(@Param("id") int id);
}