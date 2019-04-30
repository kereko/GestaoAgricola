package br.com.sansa.web.rest;

import br.com.sansa.GestaoAgricolaApp;

import br.com.sansa.domain.Fazenda;
import br.com.sansa.repository.FazendaRepository;
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
import java.util.List;


import static br.com.sansa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FazendaResource REST controller.
 *
 * @see FazendaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoAgricolaApp.class)
public class FazendaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_MUNICIPIO = "AAAAAAAAAA";
    private static final String UPDATED_MUNICIPIO = "BBBBBBBBBB";

    private static final Double DEFAULT_AREA = 1D;
    private static final Double UPDATED_AREA = 2D;

    private static final String DEFAULT_GEOMETRIA = "AAAAAAAAAA";
    private static final String UPDATED_GEOMETRIA = "BBBBBBBBBB";

    @Autowired
    private FazendaRepository fazendaRepository;

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

    private MockMvc restFazendaMockMvc;

    private Fazenda fazenda;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FazendaResource fazendaResource = new FazendaResource(fazendaRepository);
        this.restFazendaMockMvc = MockMvcBuilders.standaloneSetup(fazendaResource)
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
    public static Fazenda createEntity(EntityManager em) {
        Fazenda fazenda = new Fazenda()
            .nome(DEFAULT_NOME)
            .municipio(DEFAULT_MUNICIPIO)
            .area(DEFAULT_AREA)
            .geometria(DEFAULT_GEOMETRIA);
        return fazenda;
    }

    @Before
    public void initTest() {
        fazenda = createEntity(em);
    }

    @Test
    @Transactional
    public void createFazenda() throws Exception {
        int databaseSizeBeforeCreate = fazendaRepository.findAll().size();

        // Create the Fazenda
        restFazendaMockMvc.perform(post("/api/fazendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fazenda)))
            .andExpect(status().isCreated());

        // Validate the Fazenda in the database
        List<Fazenda> fazendaList = fazendaRepository.findAll();
        assertThat(fazendaList).hasSize(databaseSizeBeforeCreate + 1);
        Fazenda testFazenda = fazendaList.get(fazendaList.size() - 1);
        assertThat(testFazenda.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testFazenda.getMunicipio()).isEqualTo(DEFAULT_MUNICIPIO);
        assertThat(testFazenda.getArea()).isEqualTo(DEFAULT_AREA);
        assertThat(testFazenda.getGeometria()).isEqualTo(DEFAULT_GEOMETRIA);
    }

    @Test
    @Transactional
    public void createFazendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fazendaRepository.findAll().size();

        // Create the Fazenda with an existing ID
        fazenda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFazendaMockMvc.perform(post("/api/fazendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fazenda)))
            .andExpect(status().isBadRequest());

        // Validate the Fazenda in the database
        List<Fazenda> fazendaList = fazendaRepository.findAll();
        assertThat(fazendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFazendas() throws Exception {
        // Initialize the database
        fazendaRepository.saveAndFlush(fazenda);

        // Get all the fazendaList
        restFazendaMockMvc.perform(get("/api/fazendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fazenda.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].municipio").value(hasItem(DEFAULT_MUNICIPIO.toString())))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].geometria").value(hasItem(DEFAULT_GEOMETRIA.toString())));
    }
    
    @Test
    @Transactional
    public void getFazenda() throws Exception {
        // Initialize the database
        fazendaRepository.saveAndFlush(fazenda);

        // Get the fazenda
        restFazendaMockMvc.perform(get("/api/fazendas/{id}", fazenda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fazenda.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.municipio").value(DEFAULT_MUNICIPIO.toString()))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA.doubleValue()))
            .andExpect(jsonPath("$.geometria").value(DEFAULT_GEOMETRIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFazenda() throws Exception {
        // Get the fazenda
        restFazendaMockMvc.perform(get("/api/fazendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFazenda() throws Exception {
        // Initialize the database
        fazendaRepository.saveAndFlush(fazenda);

        int databaseSizeBeforeUpdate = fazendaRepository.findAll().size();

        // Update the fazenda
        Fazenda updatedFazenda = fazendaRepository.findById(fazenda.getId()).get();
        // Disconnect from session so that the updates on updatedFazenda are not directly saved in db
        em.detach(updatedFazenda);
        updatedFazenda
            .nome(UPDATED_NOME)
            .municipio(UPDATED_MUNICIPIO)
            .area(UPDATED_AREA)
            .geometria(UPDATED_GEOMETRIA);

        restFazendaMockMvc.perform(put("/api/fazendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFazenda)))
            .andExpect(status().isOk());

        // Validate the Fazenda in the database
        List<Fazenda> fazendaList = fazendaRepository.findAll();
        assertThat(fazendaList).hasSize(databaseSizeBeforeUpdate);
        Fazenda testFazenda = fazendaList.get(fazendaList.size() - 1);
        assertThat(testFazenda.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testFazenda.getMunicipio()).isEqualTo(UPDATED_MUNICIPIO);
        assertThat(testFazenda.getArea()).isEqualTo(UPDATED_AREA);
        assertThat(testFazenda.getGeometria()).isEqualTo(UPDATED_GEOMETRIA);
    }

    @Test
    @Transactional
    public void updateNonExistingFazenda() throws Exception {
        int databaseSizeBeforeUpdate = fazendaRepository.findAll().size();

        // Create the Fazenda

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFazendaMockMvc.perform(put("/api/fazendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fazenda)))
            .andExpect(status().isBadRequest());

        // Validate the Fazenda in the database
        List<Fazenda> fazendaList = fazendaRepository.findAll();
        assertThat(fazendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFazenda() throws Exception {
        // Initialize the database
        fazendaRepository.saveAndFlush(fazenda);

        int databaseSizeBeforeDelete = fazendaRepository.findAll().size();

        // Delete the fazenda
        restFazendaMockMvc.perform(delete("/api/fazendas/{id}", fazenda.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fazenda> fazendaList = fazendaRepository.findAll();
        assertThat(fazendaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fazenda.class);
        Fazenda fazenda1 = new Fazenda();
        fazenda1.setId(1L);
        Fazenda fazenda2 = new Fazenda();
        fazenda2.setId(fazenda1.getId());
        assertThat(fazenda1).isEqualTo(fazenda2);
        fazenda2.setId(2L);
        assertThat(fazenda1).isNotEqualTo(fazenda2);
        fazenda1.setId(null);
        assertThat(fazenda1).isNotEqualTo(fazenda2);
    }
}
