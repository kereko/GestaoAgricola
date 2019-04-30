package br.com.sansa.repository;

import br.com.sansa.domain.Venda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Venda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

}
