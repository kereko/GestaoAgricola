package br.com.sansa.web.rest;

import br.com.sansa.GestaoAgricolaApp;

import br.com.sansa.domain.Plantio;
import br.com.sansa.repository.PlantioRepository;
import br.com.sansa.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static br.com.sansa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PlantioResource REST controller.
 *
 * @see PlantioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoAgricolaApp.class)
public class PlantioResourceIntTest {

    private static final LocalDate DEFAULT_DATA_PLANTIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_PLANTIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_PREVISAO_COLHEITA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_PREVISAO_COLHEITA = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_QUANTIDADE_PLANTADO = 1D;
    private static final Double UPDATED_QUANTIDADE_PLANTADO = 2D;

    @Autowired
    private PlantioRepository plantioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPlantioMockMvc;

    private Plantio plantio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlantioResource plantioResource = new PlantioResource(plantioRepository);
        this.restPlantioMockMvc = MockMvcBuilders.standaloneSetup(plantioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plantio createEntity(EntityManager em) {
        Plantio plantio = new Plantio()
            .dataPlantio(DEFAULT_DATA_PLANTIO)
            .dataPrevisaoColheita(DEFAULT_DATA_PREVISAO_COLHEITA)
            .quantidadePlantado(DEFAULT_QUANTIDADE_PLANTADO);
        return plantio;
    }

    @Before
    public void initTest() {
        plantio = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlantio() throws Exception {
        int databaseSizeBeforeCreate = plantioRepository.findAll().size();

        // Create the Plantio
        restPlantioMockMvc.perform(post("/api/plantios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantio)))
            .andExpect(status().isCreated());

        // Validate the Plantio in the database
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeCreate + 1);
        Plantio testPlantio = plantioList.get(plantioList.size() - 1);
        assertThat(testPlantio.getDataPlantio()).isEqualTo(DEFAULT_DATA_PLANTIO);
        assertThat(testPlantio.getDataPrevisaoColheita()).isEqualTo(DEFAULT_DATA_PREVISAO_COLHEITA);
        assertThat(testPlantio.getQuantidadePlantado()).isEqualTo(DEFAULT_QUANTIDADE_PLANTADO);
    }

    @Test
    @Transactional
    public void createPlantioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plantioRepository.findAll().size();

        // Create the Plantio with an existing ID
        plantio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlantioMockMvc.perform(post("/api/plantios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantio)))
            .andExpect(status().isBadRequest());

        // Validate the Plantio in the database
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlantios() throws Exception {
        // Initialize the database
        plantioRepository.saveAndFlush(plantio);

        // Get all the plantioList
        restPlantioMockMvc.perform(get("/api/plantios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plantio.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataPlantio").value(hasItem(DEFAULT_DATA_PLANTIO.toString())))
            .andExpect(jsonPath("$.[*].dataPrevisaoColheita").value(hasItem(DEFAULT_DATA_PREVISAO_COLHEITA.toString())))
            .andExpect(jsonPath("$.[*].quantidadePlantado").value(hasItem(DEFAULT_QUANTIDADE_PLANTADO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPlantio() throws Exception {
        // Initialize the database
        plantioRepository.saveAndFlush(plantio);

        // Get the plantio
        restPlantioMockMvc.perform(get("/api/plantios/{id}", plantio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plantio.getId().intValue()))
            .andExpect(jsonPath("$.dataPlantio").value(DEFAULT_DATA_PLANTIO.toString()))
            .andExpect(jsonPath("$.dataPrevisaoColheita").value(DEFAULT_DATA_PREVISAO_COLHEITA.toString()))
            .andExpect(jsonPath("$.quantidadePlantado").value(DEFAULT_QUANTIDADE_PLANTADO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlantio() throws Exception {
        // Get the plantio
        restPlantioMockMvc.perform(get("/api/plantios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlantio() throws Exception {
        // Initialize the database
        plantioRepository.saveAndFlush(plantio);

        int databaseSizeBeforeUpdate = plantioRepository.findAll().size();

        // Update the plantio
        Plantio updatedPlantio = plantioRepository.findById(plantio.getId()).get();
        // Disconnect from session so that the updates on updatedPlantio are not directly saved in db
        em.detach(updatedPlantio);
        updatedPlantio
            .dataPlantio(UPDATED_DATA_PLANTIO)
            .dataPrevisaoColheita(UPDATED_DATA_PREVISAO_COLHEITA)
            .quantidadePlantado(UPDATED_QUANTIDADE_PLANTADO);

        restPlantioMockMvc.perform(put("/api/plantios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlantio)))
            .andExpect(status().isOk());

        // Validate the Plantio in the database
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeUpdate);
        Plantio testPlantio = plantioList.get(plantioList.size() - 1);
        assertThat(testPlantio.getDataPlantio()).isEqualTo(UPDATED_DATA_PLANTIO);
        assertThat(testPlantio.getDataPrevisaoColheita()).isEqualTo(UPDATED_DATA_PREVISAO_COLHEITA);
        assertThat(testPlantio.getQuantidadePlantado()).isEqualTo(UPDATED_QUANTIDADE_PLANTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingPlantio() throws Exception {
        int databaseSizeBeforeUpdate = plantioRepository.findAll().size();

        // Create the Plantio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlantioMockMvc.perform(put("/api/plantios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantio)))
            .andExpect(status().isBadRequest());

        // Validate the Plantio in the database
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlantio() throws Exception {
        // Initialize the database
        plantioRepository.saveAndFlush(plantio);

        int databaseSizeBeforeDelete = plantioRepository.findAll().size();

        // Delete the plantio
        restPlantioMockMvc.perform(delete("/api/plantios/{id}", plantio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Plantio> plantioList = plantioRepository.findAll();
        assertThat(plantioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plantio.class);
        Plantio plantio1 = new Plantio();
        plantio1.setId(1L);
        Plantio plantio2 = new Plantio();
        plantio2.setId(plantio1.getId());
        assertThat(plantio1).isEqualTo(plantio2);
        plantio2.setId(2L);
        assertThat(plantio1).isNotEqualTo(plantio2);
        plantio1.setId(null);
        assertThat(plantio1).isNotEqualTo(plantio2);
    }
}
