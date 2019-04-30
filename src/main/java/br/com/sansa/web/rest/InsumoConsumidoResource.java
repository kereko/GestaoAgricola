package br.com.sansa.web.rest;
import br.com.sansa.domain.InsumoConsumido;
import br.com.sansa.repository.InsumoConsumidoRepository;
import br.com.sansa.web.rest.errors.BadRequestAlertException;
import br.com.sansa.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing InsumoConsumido.
 */
@RestController
@RequestMapping("/api")
public class InsumoConsumidoResource {

    private final Logger log = LoggerFactory.getLogger(InsumoConsumidoResource.class);

    private static final String ENTITY_NAME = "insumoConsumido";

    private final InsumoConsumidoRepository insumoConsumidoRepository;

    public InsumoConsumidoResource(InsumoConsumidoRepository insumoConsumidoRepository) {
        this.insumoConsumidoRepository = insumoConsumidoRepository;
    }

    /**
     * POST  /insumo-consumidos : Create a new insumoConsumido.
     *
     * @param insumoConsumido the insumoConsumido to create
     * @return the ResponseEntity with status 201 (Created) and with body the new insumoConsumido, or with status 400 (Bad Request) if the insumoConsumido has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/insumo-consumidos")
    public ResponseEntity<InsumoConsumido> createInsumoConsumido(@RequestBody InsumoConsumido insumoConsumido) throws URISyntaxException {
        log.debug("REST request to save InsumoConsumido : {}", insumoConsumido);
        if (insumoConsumido.getId() != null) {
            throw new BadRequestAlertException("A new insumoConsumido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InsumoConsumido result = insumoConsumidoRepository.save(insumoConsumido);
        return ResponseEntity.created(new URI("/api/insumo-consumidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /insumo-consumidos : Updates an existing insumoConsumido.
     *
     * @param insumoConsumido the insumoConsumido to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated insumoConsumido,
     * or with status 400 (Bad Request) if the insumoConsumido is not valid,
     * or with status 500 (Internal Server Error) if the insumoConsumido couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/insumo-consumidos")
    public ResponseEntity<InsumoConsumido> updateInsumoConsumido(@RequestBody InsumoConsumido insumoConsumido) throws URISyntaxException {
        log.debug("REST request to update InsumoConsumido : {}", insumoConsumido);
        if (insumoConsumido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InsumoConsumido result = insumoConsumidoRepository.save(insumoConsumido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, insumoConsumido.getId().toString()))
            .body(result);
    }

    /**
     * GET  /insumo-consumidos : get all the insumoConsumidos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of insumoConsumidos in body
     */
    @GetMapping("/insumo-consumidos")
    public List<InsumoConsumido> getAllInsumoConsumidos() {
        log.debug("REST request to get all InsumoConsumidos");
        return insumoConsumidoRepository.findAll();
    }

    /**
     * GET  /insumo-consumidos/:id : get the "id" insumoConsumido.
     *
     * @param id the id of the insumoConsumido to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the insumoConsumido, or with status 404 (Not Found)
     */
    @GetMapping("/insumo-consumidos/{id}")
    public ResponseEntity<InsumoConsumido> getInsumoConsumido(@PathVariable Long id) {
        log.debug("REST request to get InsumoConsumido : {}", id);
        Optional<InsumoConsumido> insumoConsumido = insumoConsumidoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(insumoConsumido);
    }

    /**
     * DELETE  /insumo-consumidos/:id : delete the "id" insumoConsumido.
     *
     * @param id the id of the insumoConsumido to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/insumo-consumidos/{id}")
    public ResponseEntity<Void> deleteInsumoConsumido(@PathVariable Long id) {
        log.debug("REST request to delete InsumoConsumido : {}", id);
        insumoConsumidoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
