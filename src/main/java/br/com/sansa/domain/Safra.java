package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Safra.
 */
@Entity
@Table(name = "safra")
public class Safra implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "alcunha", nullable = false)
    private String alcunha;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @ManyToOne
    @JsonIgnoreProperties("safras")
    private Plantio plantio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlcunha() {
        return alcunha;
    }

    public Safra alcunha(String alcunha) {
        this.alcunha = alcunha;
        return this;
    }

    public void setAlcunha(String alcunha) {
        this.alcunha = alcunha;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public Safra dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public Safra dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Plantio getPlantio() {
        return plantio;
    }

    public Safra plantio(Plantio plantio) {
        this.plantio = plantio;
        return this;
    }

    public void setPlantio(Plantio plantio) {
        this.plantio = plantio;
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
        Safra safra = (Safra) o;
        if (safra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), safra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Safra{" +
            "id=" + getId() +
            ", alcunha='" + getAlcunha() + "'" +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            "}";
    }
}
