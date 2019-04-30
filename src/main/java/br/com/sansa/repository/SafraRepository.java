package br.com.sansa.repository;

import br.com.sansa.domain.Safra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Safra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SafraRepository extends JpaRepository<Safra, Long> {

}
