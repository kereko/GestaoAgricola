package br.com.sansa.repository;

import br.com.sansa.domain.ProdutoAgricola;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProdutoAgricola entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutoAgricolaRepository extends JpaRepository<ProdutoAgricola, Long> {

}
