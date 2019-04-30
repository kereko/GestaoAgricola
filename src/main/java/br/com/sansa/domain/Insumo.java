package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Insumo.
 */
@Entity
@Table(name = "insumo")
public class Insumo implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "qtd_estoque")
    private Double qtdEstoque;

    @Column(name = "custo_por_unidade")
    private Double custoPorUnidade;

    @Column(name = "categoria")
    private String categoria;

    @ManyToOne
    @JsonIgnoreProperties("insumos")
    private InsumoConsumido insumoConsumido;

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

    public Insumo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getQtdEstoque() {
        return qtdEstoque;
    }

    public Insumo qtdEstoque(Double qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
        return this;
    }

    public void setQtdEstoque(Double qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
    }

    public Double getCustoPorUnidade() {
        return custoPorUnidade;
    }

    public Insumo custoPorUnidade(Double custoPorUnidade) {
        this.custoPorUnidade = custoPorUnidade;
        return this;
    }

    public void setCustoPorUnidade(Double custoPorUnidade) {
        this.custoPorUnidade = custoPorUnidade;
    }

    public String getCategoria() {
        return categoria;
    }

    public Insumo categoria(String categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public InsumoConsumido getInsumoConsumido() {
        return insumoConsumido;
    }

    public Insumo insumoConsumido(InsumoConsumido insumoConsumido) {
        this.insumoConsumido = insumoConsumido;
        return this;
    }

    public void setInsumoConsumido(InsumoConsumido insumoConsumido) {
        this.insumoConsumido = insumoConsumido;
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
        Insumo insumo = (Insumo) o;
        if (insumo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), insumo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Insumo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", qtdEstoque=" + getQtdEstoque() +
            ", custoPorUnidade=" + getCustoPorUnidade() +
            ", categoria='" + getCategoria() + "'" +
            "}";
    }
}
