package br.com.sansa.web.rest;
import br.com.sansa.domain.Plantio;
import br.com.sansa.repository.PlantioRepository;
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
 * REST controller for managing Plantio.
 */
@RestController
@RequestMapping("/api")
public class PlantioResource {

    private final Logger log = LoggerFactory.getLogger(PlantioResource.class);

    private static final String ENTITY_NAME = "plantio";

    private final PlantioRepository plantioRepository;

    public PlantioResource(PlantioRepository plantioRepository) {
        this.plantioRepository = plantioRepository;
    }

    /**
     * POST  /plantios : Create a new plantio.
     *
     * @param plantio the plantio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new plantio, or with status 400 (Bad Request) if the plantio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/plantios")
    public ResponseEntity<Plantio> createPlantio(@RequestBody Plantio plantio) throws URISyntaxException {
        log.debug("REST request to save Plantio : {}", plantio);
        if (plantio.getId() != null) {
            throw new BadRequestAlertException("A new plantio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plantio result = plantioRepository.save(plantio);
        return ResponseEntity.created(new URI("/api/plantios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /plantios : Updates an existing plantio.
     *
     * @param plantio the plantio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated plantio,
     * or with status 400 (Bad Request) if the plantio is not valid,
     * or with status 500 (Internal Server Error) if the plantio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/plantios")
    public ResponseEntity<Plantio> updatePlantio(@RequestBody Plantio plantio) throws URISyntaxException {
        log.debug("REST request to update Plantio : {}", plantio);
        if (plantio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plantio result = plantioRepository.save(plantio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, plantio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /plantios : get all the plantios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of plantios in body
     */
    @GetMapping("/plantios")
    public List<Plantio> getAllPlantios() {
        log.debug("REST request to get all Plantios");
        return plantioRepository.findAll();
    }

    /**
     * GET  /plantios/:id : get the "id" plantio.
     *
     * @param id the id of the plantio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the plantio, or with status 404 (Not Found)
     */
    @GetMapping("/plantios/{id}")
    public ResponseEntity<Plantio> getPlantio(@PathVariable Long id) {
        log.debug("REST request to get Plantio : {}", id);
        Optional<Plantio> plantio = plantioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plantio);
    }

    /**
     * DELETE  /plantios/:id : delete the "id" plantio.
     *
     * @param id the id of the plantio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/plantios/{id}")
    public ResponseEntity<Void> deletePlantio(@PathVariable Long id) {
        log.debug("REST request to delete Plantio : {}", id);
        plantioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
