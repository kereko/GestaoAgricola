package br.com.sansa.repository;

import br.com.sansa.domain.Fazenda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Fazenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FazendaRepository extends JpaRepository<Fazenda, Long> {

}
