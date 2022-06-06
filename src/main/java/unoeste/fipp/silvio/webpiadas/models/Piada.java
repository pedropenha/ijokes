package unoeste.fipp.silvio.webpiadas.models;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name="piada")
public class Piada implements Serializable
{
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="pi_id")
    private Long id;
    
    @Column(name="pi_titulo")
    private String titulo;
    
    @Column(name="pi_texto")
    private String texto;

    @Column(name="pi_keywords")
    private String keywords;

    @Column(name="pi_ranking")
    private int ranking;

    @ManyToOne
    @JoinColumn(name="cat_id", nullable=false)
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private Pessoa pessoa;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public int getRanking() {
        return ranking;
    }

    public void setRanking(int ranking) {
        this.ranking = ranking;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Piada(){

    }
    public Piada(String titulo, String texto, String keywords, int ranking, Categoria categoria, Pessoa pessoa) {
        this.titulo = titulo;
        this.texto = texto;
        this.keywords = keywords;
        this.ranking = ranking;
        this.categoria = categoria;
        this.pessoa = pessoa;
    }

    public Piada(Long id, String titulo, String texto, String keywords, int ranking, Categoria categoria, Pessoa pessoa) {
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.keywords = keywords;
        this.ranking = ranking;
        this.categoria = categoria;
        this.pessoa = pessoa;
    }
}