package unoeste.fipp.silvio.webpiadas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.silvio.webpiadas.models.Categoria;
import unoeste.fipp.silvio.webpiadas.models.Piada;

import java.util.List;

public interface PiadaRepository extends JpaRepository<Piada,Long>{
    @Query(value = "SELECT * FROM PIADA WHERE pi_titulo LIKE :filter%")
    public List<Piada> findWithFilter(@Param("filter") String filter);

    @Query(value = "UPDATE PIADA SET = pi_titulo = :titulo, pi_texto = :texto, pi_keywords = :keywords, cat_id = :cat_id")
    public Piada editPiada(@Param("titulo") String titulo, @Param("text") String texto, @Param("keywords") String keywords, @Param("cat_id") Long cat_id);
}
