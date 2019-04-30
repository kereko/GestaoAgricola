package br.com.sansa.repository;

import br.com.sansa.domain.Cultura;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cultura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CulturaRepository extends JpaRepository<Cultura, Long> {

}
