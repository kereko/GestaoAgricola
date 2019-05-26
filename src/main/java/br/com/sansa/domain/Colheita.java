package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Colheita.
 */
@Entity
@Table(name = "colheita")
public class Colheita implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_colheita")
    private LocalDate dataColheita;

    @Column(name = "produtividade")
    private Double produtividade;

    @OneToOne
    @JoinColumn(unique = true)
    private ProdutoAgricola produtoAgricola;

    @OneToOne(mappedBy = "colheita")
    @JsonIgnore
    private Plantio plantio;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataColheita() {
        return dataColheita;
    }

    public Colheita dataColheita(LocalDate dataColheita) {
        this.dataColheita = dataColheita;
        return this;
    }

    public void setDataColheita(LocalDate dataColheita) {
        this.dataColheita = dataColheita;
    }

    public Double getProdutividade() {
        return produtividade;
    }

    public Colheita produtividade(Double produtividade) {
        this.produtividade = produtividade;
        return this;
    }

    public void setProdutividade(Double produtividade) {
        this.produtividade = produtividade;
    }

    public ProdutoAgricola getProdutoAgricola() {
        return produtoAgricola;
    }

    public Colheita produtoAgricola(ProdutoAgricola produtoAgricola) {
        this.produtoAgricola = produtoAgricola;
        return this;
    }

    public void setProdutoAgricola(ProdutoAgricola produtoAgricola) {
        this.produtoAgricola = produtoAgricola;
    }

    public Plantio getPlantio() {
        return plantio;
    }

    public Colheita plantio(Plantio plantio) {
        this.plantio = plantio;
        return this;
    }

    public void setPlantio(Plantio plantio) {
        if (plantio!=null && plantio.getDataPlantio()!=null && plantio.getDataPlantio().isBefore(dataColheita))
            this.plantio = plantio;
        else
            this.plantio = null;
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
        Colheita colheita = (Colheita) o;
        if (colheita.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), colheita.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Colheita{" +
            "id=" + getId() +
            ", dataColheita='" + getDataColheita() + "'" +
            ", produtividade=" + getProdutividade() +
            "}";
    }
}
