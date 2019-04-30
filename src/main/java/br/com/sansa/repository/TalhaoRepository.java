package br.com.sansa.repository;

import br.com.sansa.domain.Talhao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Talhao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TalhaoRepository extends JpaRepository<Talhao, Long> {

}
