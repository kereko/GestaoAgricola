package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Fazenda.
 */
@Entity
@Table(name = "fazenda")
public class Fazenda implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "municipio")
    private String municipio;

    @Column(name = "area")
    private Double area;

    @Column(name = "geometria")
    private String geometria;

    @ManyToOne
    @JsonIgnoreProperties("fazendas")
    private Produtor produtor;

    @OneToMany(mappedBy = "fazenda")
    private Set<Talhao> talhaos = new HashSet<>();
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

    public Fazenda nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMunicipio() {
        return municipio;
    }

    public Fazenda municipio(String municipio) {
        this.municipio = municipio;
        return this;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public Double getArea() {
        return area;
    }

    public Fazenda area(Double area) {
        this.area = area;
        return this;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getGeometria() {
        return geometria;
    }

    public Fazenda geometria(String geometria) {
        this.geometria = geometria;
        return this;
    }

    public void setGeometria(String geometria) {
        this.geometria = geometria;
    }

    public Produtor getProdutor() {
        return produtor;
    }

    public Fazenda produtor(Produtor produtor) {
        this.produtor = produtor;
        return this;
    }

    public void setProdutor(Produtor produtor) {
        this.produtor = produtor;
    }

    public Set<Talhao> getTalhaos() {
        return talhaos;
    }

    public Fazenda talhaos(Set<Talhao> talhaos) {
        this.talhaos = talhaos;
        return this;
    }

    public Fazenda addTalhao(Talhao talhao) {
        this.talhaos.add(talhao);
        talhao.setFazenda(this);
        return this;
    }

    public Fazenda removeTalhao(Talhao talhao) {
        this.talhaos.remove(talhao);
        talhao.setFazenda(null);
        return this;
    }

    public void setTalhaos(Set<Talhao> talhaos) {
        this.talhaos = talhaos;
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
        Fazenda fazenda = (Fazenda) o;
        if (fazenda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fazenda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fazenda{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", municipio='" + getMunicipio() + "'" +
            ", area=" + getArea() +
            ", geometria='" + getGeometria() + "'" +
            "}";
    }
}
