package br.com.sansa.repository;

import br.com.sansa.domain.InsumoConsumido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InsumoConsumido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InsumoConsumidoRepository extends JpaRepository<InsumoConsumido, Long> {

}
