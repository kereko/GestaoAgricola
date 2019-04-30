package br.com.sansa.web.rest;

import br.com.sansa.GestaoAgricolaApp;

import br.com.sansa.domain.ProdutoAgricola;
import br.com.sansa.repository.ProdutoAgricolaRepository;
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
 * Test class for the ProdutoAgricolaResource REST controller.
 *
 * @see ProdutoAgricolaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoAgricolaApp.class)
public class ProdutoAgricolaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private ProdutoAgricolaRepository produtoAgricolaRepository;

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

    private MockMvc restProdutoAgricolaMockMvc;

    private ProdutoAgricola produtoAgricola;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProdutoAgricolaResource produtoAgricolaResource = new ProdutoAgricolaResource(produtoAgricolaRepository);
        this.restProdutoAgricolaMockMvc = MockMvcBuilders.standaloneSetup(produtoAgricolaResource)
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
    public static ProdutoAgricola createEntity(EntityManager em) {
        ProdutoAgricola produtoAgricola = new ProdutoAgricola()
            .nome(DEFAULT_NOME);
        return produtoAgricola;
    }

    @Before
    public void initTest() {
        produtoAgricola = createEntity(em);
    }

    @Test
    @Transactional
    public void createProdutoAgricola() throws Exception {
        int databaseSizeBeforeCreate = produtoAgricolaRepository.findAll().size();

        // Create the ProdutoAgricola
        restProdutoAgricolaMockMvc.perform(post("/api/produto-agricolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoAgricola)))
            .andExpect(status().isCreated());

        // Validate the ProdutoAgricola in the database
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeCreate + 1);
        ProdutoAgricola testProdutoAgricola = produtoAgricolaList.get(produtoAgricolaList.size() - 1);
        assertThat(testProdutoAgricola.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createProdutoAgricolaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produtoAgricolaRepository.findAll().size();

        // Create the ProdutoAgricola with an existing ID
        produtoAgricola.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdutoAgricolaMockMvc.perform(post("/api/produto-agricolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoAgricola)))
            .andExpect(status().isBadRequest());

        // Validate the ProdutoAgricola in the database
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProdutoAgricolas() throws Exception {
        // Initialize the database
        produtoAgricolaRepository.saveAndFlush(produtoAgricola);

        // Get all the produtoAgricolaList
        restProdutoAgricolaMockMvc.perform(get("/api/produto-agricolas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produtoAgricola.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }
    
    @Test
    @Transactional
    public void getProdutoAgricola() throws Exception {
        // Initialize the database
        produtoAgricolaRepository.saveAndFlush(produtoAgricola);

        // Get the produtoAgricola
        restProdutoAgricolaMockMvc.perform(get("/api/produto-agricolas/{id}", produtoAgricola.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(produtoAgricola.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProdutoAgricola() throws Exception {
        // Get the produtoAgricola
        restProdutoAgricolaMockMvc.perform(get("/api/produto-agricolas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProdutoAgricola() throws Exception {
        // Initialize the database
        produtoAgricolaRepository.saveAndFlush(produtoAgricola);

        int databaseSizeBeforeUpdate = produtoAgricolaRepository.findAll().size();

        // Update the produtoAgricola
        ProdutoAgricola updatedProdutoAgricola = produtoAgricolaRepository.findById(produtoAgricola.getId()).get();
        // Disconnect from session so that the updates on updatedProdutoAgricola are not directly saved in db
        em.detach(updatedProdutoAgricola);
        updatedProdutoAgricola
            .nome(UPDATED_NOME);

        restProdutoAgricolaMockMvc.perform(put("/api/produto-agricolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProdutoAgricola)))
            .andExpect(status().isOk());

        // Validate the ProdutoAgricola in the database
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeUpdate);
        ProdutoAgricola testProdutoAgricola = produtoAgricolaList.get(produtoAgricolaList.size() - 1);
        assertThat(testProdutoAgricola.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingProdutoAgricola() throws Exception {
        int databaseSizeBeforeUpdate = produtoAgricolaRepository.findAll().size();

        // Create the ProdutoAgricola

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutoAgricolaMockMvc.perform(put("/api/produto-agricolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoAgricola)))
            .andExpect(status().isBadRequest());

        // Validate the ProdutoAgricola in the database
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProdutoAgricola() throws Exception {
        // Initialize the database
        produtoAgricolaRepository.saveAndFlush(produtoAgricola);

        int databaseSizeBeforeDelete = produtoAgricolaRepository.findAll().size();

        // Delete the produtoAgricola
        restProdutoAgricolaMockMvc.perform(delete("/api/produto-agricolas/{id}", produtoAgricola.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProdutoAgricola> produtoAgricolaList = produtoAgricolaRepository.findAll();
        assertThat(produtoAgricolaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdutoAgricola.class);
        ProdutoAgricola produtoAgricola1 = new ProdutoAgricola();
        produtoAgricola1.setId(1L);
        ProdutoAgricola produtoAgricola2 = new ProdutoAgricola();
        produtoAgricola2.setId(produtoAgricola1.getId());
        assertThat(produtoAgricola1).isEqualTo(produtoAgricola2);
        produtoAgricola2.setId(2L);
        assertThat(produtoAgricola1).isNotEqualTo(produtoAgricola2);
        produtoAgricola1.setId(null);
        assertThat(produtoAgricola1).isNotEqualTo(produtoAgricola2);
    }
}
