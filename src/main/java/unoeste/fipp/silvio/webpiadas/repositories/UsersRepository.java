package unoeste.fipp.silvio.webpiadas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.silvio.webpiadas.models.Categoria;
import unoeste.fipp.silvio.webpiadas.models.Users;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Long> {

    @Query(value="SELECT * FROM user u WHERE u.nome LIKE :filter%",nativeQuery=true)
    public List<Users> findAllWithFilter(@Param("filter") String filter);
}