package br.com.sansa.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ProdutoVenda.
 */
@Entity
@Table(name = "produto_venda")
public class ProdutoVenda implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "preco")
    private Double preco;

    @OneToMany(mappedBy = "produtoVenda")
    private Set<ProdutoAgricola> produtosAgricolas = new HashSet<>();
    @OneToMany(mappedBy = "produtoVenda")
    private Set<Venda> clientes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPreco() {
        return preco;
    }

    public ProdutoVenda preco(Double preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Set<ProdutoAgricola> getProdutosAgricolas() {
        return produtosAgricolas;
    }

    public ProdutoVenda produtosAgricolas(Set<ProdutoAgricola> produtoAgricolas) {
        this.produtosAgricolas = produtoAgricolas;
        return this;
    }

    public ProdutoVenda addProdutosAgricola(ProdutoAgricola produtoAgricola) {
        this.produtosAgricolas.add(produtoAgricola);
        produtoAgricola.setProdutoVenda(this);
        return this;
    }

    public ProdutoVenda removeProdutosAgricola(ProdutoAgricola produtoAgricola) {
        this.produtosAgricolas.remove(produtoAgricola);
        produtoAgricola.setProdutoVenda(null);
        return this;
    }

    public void setProdutosAgricolas(Set<ProdutoAgricola> produtoAgricolas) {
        this.produtosAgricolas = produtoAgricolas;
    }

    public Set<Venda> getClientes() {
        return clientes;
    }

    public ProdutoVenda clientes(Set<Venda> vendas) {
        this.clientes = vendas;
        return this;
    }

    public ProdutoVenda addCliente(Venda venda) {
        this.clientes.add(venda);
        venda.setProdutoVenda(this);
        return this;
    }

    public ProdutoVenda removeCliente(Venda venda) {
        this.clientes.remove(venda);
        venda.setProdutoVenda(null);
        return this;
    }

    public void setClientes(Set<Venda> vendas) {
        this.clientes = vendas;
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
        ProdutoVenda produtoVenda = (ProdutoVenda) o;
        if (produtoVenda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produtoVenda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProdutoVenda{" +
            "id=" + getId() +
            ", preco=" + getPreco() +
            "}";
    }
}
