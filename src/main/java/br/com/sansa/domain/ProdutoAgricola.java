package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProdutoAgricola.
 */
@Entity
@Table(name = "produto_agricola")
public class ProdutoAgricola implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToOne(mappedBy = "produtoAgricola")
    @JsonIgnore
    private Colheita colheita;

    @ManyToOne
    @JsonIgnoreProperties("produtosAgricolas")
    private ProdutoVenda produtoVenda;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public ProdutoAgricola nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Colheita getColheita() {
        return colheita;
    }

    public ProdutoAgricola colheita(Colheita colheita) {
        this.colheita = colheita;
        return this;
    }

    public void setColheita(Colheita colheita) {
        this.colheita = colheita;
    }

    public ProdutoVenda getProdutoVenda() {
        return produtoVenda;
    }

    public ProdutoAgricola produtoVenda(ProdutoVenda produtoVenda) {
        this.produtoVenda = produtoVenda;
        return this;
    }

    public void setProdutoVenda(ProdutoVenda produtoVenda) {
        this.produtoVenda = produtoVenda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProdutoAgricola produtoAgricola = (ProdutoAgricola) o;
        if (produtoAgricola.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produtoAgricola.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProdutoAgricola{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
