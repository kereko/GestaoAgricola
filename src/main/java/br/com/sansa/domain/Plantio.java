package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Employee entity.
 */
@ApiModel(description = "The Employee entity.")
@Entity
@Table(name = "plantio")
public class Plantio implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Column(name = "data_plantio")
    private LocalDate dataPlantio;

    @Column(name = "data_previsao_colheita")
    private LocalDate dataPrevisaoColheita;

    @Column(name = "quantidade_plantado")
    private Double quantidadePlantado;

    @ManyToOne
    @JsonIgnoreProperties("plantios")
    private Talhao talhao;

    @ManyToOne
    @JsonIgnoreProperties("plantios")
    private Cultura cultura;

    @OneToOne
    @JoinColumn(unique = true)
    private Colheita colheita;

    @OneToMany(mappedBy = "plantio")
    private Set<Safra> safras = new HashSet<>();
    @OneToMany(mappedBy = "plantio")
    private Set<InsumoConsumido> insumoConsumidos = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataPlantio() {
        return dataPlantio;
    }

    public Plantio dataPlantio(LocalDate dataPlantio) {
        this.dataPlantio = dataPlantio;
        return this;
    }

    public void setDataPlantio(LocalDate dataPlantio) {
        this.dataPlantio = dataPlantio;
    }

    public LocalDate getDataPrevisaoColheita() {
        return dataPrevisaoColheita;
    }

    public Plantio dataPrevisaoColheita(LocalDate dataPrevisaoColheita) {
        this.dataPrevisaoColheita = dataPrevisaoColheita;
        return this;
    }

    public void setDataPrevisaoColheita(LocalDate dataPrevisaoColheita) {
        this.dataPrevisaoColheita = dataPrevisaoColheita;
    }

    public Double getQuantidadePlantado() {
        return quantidadePlantado;
    }

    public Plantio quantidadePlantado(Double quantidadePlantado) {
        this.quantidadePlantado = quantidadePlantado;
        return this;
    }

    public void setQuantidadePlantado(Double quantidadePlantado) {
        this.quantidadePlantado = quantidadePlantado;
    }

    public Talhao getTalhao() {
        return talhao;
    }

    public Plantio talhao(Talhao talhao) {
        this.talhao = talhao;
        return this;
    }

    public void setTalhao(Talhao talhao) {
        this.talhao = talhao;
    }

    public Cultura getCultura() {
        return cultura;
    }

    public Plantio cultura(Cultura cultura) {
        this.cultura = cultura;
        return this;
    }

    public void setCultura(Cultura cultura) {
        this.cultura = cultura;
    }

    public Colheita getColheita() {
        return colheita;
    }

    public Plantio colheita(Colheita colheita) {
        this.colheita = colheita;
        return this;
    }

    public void setColheita(Colheita colheita) {
        this.colheita = colheita;
    }

    public Set<Safra> getSafras() {
        return safras;
    }

    public Plantio safras(Set<Safra> safras) {
        this.safras = safras;
        return this;
    }

    public Plantio addSafra(Safra safra) {
        this.safras.add(safra);
        safra.setPlantio(this);
        return this;
    }

    public Plantio removeSafra(Safra safra) {
        this.safras.remove(safra);
        safra.setPlantio(null);
        return this;
    }

    public void setSafras(Set<Safra> safras) {
        this.safras = safras;
    }

    public Set<InsumoConsumido> getInsumoConsumidos() {
        return insumoConsumidos;
    }

    public Plantio insumoConsumidos(Set<InsumoConsumido> insumoConsumidos) {
        this.insumoConsumidos = insumoConsumidos;
        return this;
    }

    public Plantio addInsumoConsumido(InsumoConsumido insumoConsumido) {
        this.insumoConsumidos.add(insumoConsumido);
        insumoConsumido.setPlantio(this);
        return this;
    }

    public Plantio removeInsumoConsumido(InsumoConsumido insumoConsumido) {
        this.insumoConsumidos.remove(insumoConsumido);
        insumoConsumido.setPlantio(null);
        return this;
    }

    public void setInsumoConsumidos(Set<InsumoConsumido> insumoConsumidos) {
        this.insumoConsumidos = insumoConsumidos;
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
        Plantio plantio = (Plantio) o;
        if (plantio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plantio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Plantio{" +
            "id=" + getId() +
            ", dataPlantio='" + getDataPlantio() + "'" +
            ", dataPrevisaoColheita='" + getDataPrevisaoColheita() + "'" +
            ", quantidadePlantado=" + getQuantidadePlantado() +
            "}";
    }
}
