package unoeste.fipp.silvio.webpiadas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.silvio.webpiadas.models.Piada;

import java.util.List;

public interface PiadaRepository extends JpaRepository<Piada,Long>{
    @Query(value = "SELECT * FROM PIADA WHERE pi_keywords LIKE %:filter% ORDER BY pi_ranking DESC", nativeQuery = true)
    public List<Piada> findWithFilter(@Param("filter") String filter);

    @Query(value = "SELECT * FROM PIADA WHERE cat_id = :cat_id ORDER BY pi_ranking DESC", nativeQuery = true)
    public List<Piada> findWithCat(@Param("cat_id") Long id);

    @Query(value = "SELECT * FROM PIADA WHERE pi_id = :pi_id", nativeQuery = true)
    public Piada findByIdPiada(@Param("pi_id") Long id);

    @Query(value = "SELECT * FROM PIADA WHERE user_id = :id ORDER BY pi_ranking DESC", nativeQuery = true)
    public List<Piada> findWithId(@Param("id") Long id);

    @Modifying
    @Query(value = "UPDATE PIADA SET = pi_titulo = :titulo, pi_texto = :texto, pi_keywords = :keywords, cat_id = :cat_id WHERE pi_id = :pi_id", nativeQuery = true)
    public Piada editPiada(@Param("titulo") String titulo, @Param("text") String texto, @Param("keywords") String keywords, @Param("cat_id") Long cat_id, @Param("pi_id") Long id);

    @Modifying
    @Query(value = "update piada set pi_ranking = pi_ranking + 1 where pi_id = :id", nativeQuery = true)
    public void votar(@Param("id") int id);
}
