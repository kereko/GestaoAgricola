package br.com.sansa.repository;

import br.com.sansa.domain.Plantio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Plantio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantioRepository extends JpaRepository<Plantio, Long> {

}
