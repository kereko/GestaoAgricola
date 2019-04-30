package br.com.sansa.repository;

import br.com.sansa.domain.Colheita;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Colheita entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColheitaRepository extends JpaRepository<Colheita, Long> {

}
