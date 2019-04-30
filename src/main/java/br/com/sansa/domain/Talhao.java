package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "talhao")
public class Talhao implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "geometria")
    private String geometria;

    @ManyToOne
    @JsonIgnoreProperties("talhaos")
    private Fazenda fazenda;

    @OneToMany(mappedBy = "talhao")
    private Set<Plantio> plantios = new HashSet<>();
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

    public Talhao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getGeometria() {
        return geometria;
    }

    public Talhao geometria(String geometria) {
        this.geometria = geometria;
        return this;
    }

    public void setGeometria(String geometria) {
        this.geometria = geometria;
    }

    public Fazenda getFazenda() {
        return fazenda;
    }

    public Talhao fazenda(Fazenda fazenda) {
        this.fazenda = fazenda;
        return this;
    }

    public void setFazenda(Fazenda fazenda) {
        this.fazenda = fazenda;
    }

    public Set<Plantio> getPlantios() {
        return plantios;
    }

    public Talhao plantios(Set<Plantio> plantios) {
        this.plantios = plantios;
        return this;
    }

    public Talhao addPlantio(Plantio plantio) {
        this.plantios.add(plantio);
        plantio.setTalhao(this);
        return this;
    }

    public Talhao removePlantio(Plantio plantio) {
        this.plantios.remove(plantio);
        plantio.setTalhao(null);
        return this;
    }

    public void setPlantios(Set<Plantio> plantios) {
        this.plantios = plantios;
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
        Talhao talhao = (Talhao) o;
        if (talhao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), talhao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Talhao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", geometria='" + getGeometria() + "'" +
            "}";
    }
}
