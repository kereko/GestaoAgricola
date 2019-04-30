package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A InsumoConsumido.
 */
@Entity
@Table(name = "insumo_consumido")
public class InsumoConsumido implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantidade")
    private Double quantidade;

    @Column(name = "custo_total")
    private Double custoTotal;

    @ManyToOne
    @JsonIgnoreProperties("insumoConsumidos")
    private Plantio plantio;

    @OneToMany(mappedBy = "insumoConsumido")
    private Set<Insumo> insumos = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public InsumoConsumido quantidade(Double quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public Double getCustoTotal() {
        return custoTotal;
    }

    public InsumoConsumido custoTotal(Double custoTotal) {
        this.custoTotal = custoTotal;
        return this;
    }

    public void setCustoTotal(Double custoTotal) {
        this.custoTotal = custoTotal;
    }

    public Plantio getPlantio() {
        return plantio;
    }

    public InsumoConsumido plantio(Plantio plantio) {
        this.plantio = plantio;
        return this;
    }

    public void setPlantio(Plantio plantio) {
        this.plantio = plantio;
    }

    public Set<Insumo> getInsumos() {
        return insumos;
    }

    public InsumoConsumido insumos(Set<Insumo> insumos) {
        this.insumos = insumos;
        return this;
    }

    public InsumoConsumido addInsumo(Insumo insumo) {
        this.insumos.add(insumo);
        insumo.setInsumoConsumido(this);
        return this;
    }

    public InsumoConsumido removeInsumo(Insumo insumo) {
        this.insumos.remove(insumo);
        insumo.setInsumoConsumido(null);
        return this;
    }

    public void setInsumos(Set<Insumo> insumos) {
        this.insumos = insumos;
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
        InsumoConsumido insumoConsumido = (InsumoConsumido) o;
        if (insumoConsumido.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), insumoConsumido.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InsumoConsumido{" +
            "id=" + getId() +
            ", quantidade=" + getQuantidade() +
            ", custoTotal=" + getCustoTotal() +
            "}";
    }
}
