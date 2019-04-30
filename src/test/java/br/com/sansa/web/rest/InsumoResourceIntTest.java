package br.com.sansa.web.rest;

import br.com.sansa.GestaoAgricolaApp;

import br.com.sansa.domain.Insumo;
import br.com.sansa.repository.InsumoRepository;
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
 * Test class for the InsumoResource REST controller.
 *
 * @see InsumoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoAgricolaApp.class)
public class InsumoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Double DEFAULT_QTD_ESTOQUE = 1D;
    private static final Double UPDATED_QTD_ESTOQUE = 2D;

    private static final Double DEFAULT_CUSTO_POR_UNIDADE = 1D;
    private static final Double UPDATED_CUSTO_POR_UNIDADE = 2D;

    private static final String DEFAULT_CATEGORIA = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIA = "BBBBBBBBBB";

    @Autowired
    private InsumoRepository insumoRepository;

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

    private MockMvc restInsumoMockMvc;

    private Insumo insumo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InsumoResource insumoResource = new InsumoResource(insumoRepository);
        this.restInsumoMockMvc = MockMvcBuilders.standaloneSetup(insumoResource)
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
    public static Insumo createEntity(EntityManager em) {
        Insumo insumo = new Insumo()
            .nome(DEFAULT_NOME)
            .qtdEstoque(DEFAULT_QTD_ESTOQUE)
            .custoPorUnidade(DEFAULT_CUSTO_POR_UNIDADE)
            .categoria(DEFAULT_CATEGORIA);
        return insumo;
    }

    @Before
    public void initTest() {
        insumo = createEntity(em);
    }

    @Test
    @Transactional
    public void createInsumo() throws Exception {
        int databaseSizeBeforeCreate = insumoRepository.findAll().size();

        // Create the Insumo
        restInsumoMockMvc.perform(post("/api/insumos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(insumo)))
            .andExpect(status().isCreated());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeCreate + 1);
        Insumo testInsumo = insumoList.get(insumoList.size() - 1);
        assertThat(testInsumo.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testInsumo.getQtdEstoque()).isEqualTo(DEFAULT_QTD_ESTOQUE);
        assertThat(testInsumo.getCustoPorUnidade()).isEqualTo(DEFAULT_CUSTO_POR_UNIDADE);
        assertThat(testInsumo.getCategoria()).isEqualTo(DEFAULT_CATEGORIA);
    }

    @Test
    @Transactional
    public void createInsumoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = insumoRepository.findAll().size();

        // Create the Insumo with an existing ID
        insumo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInsumoMockMvc.perform(post("/api/insumos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(insumo)))
            .andExpect(status().isBadRequest());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInsumos() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        // Get all the insumoList
        restInsumoMockMvc.perform(get("/api/insumos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(insumo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].qtdEstoque").value(hasItem(DEFAULT_QTD_ESTOQUE.doubleValue())))
            .andExpect(jsonPath("$.[*].custoPorUnidade").value(hasItem(DEFAULT_CUSTO_POR_UNIDADE.doubleValue())))
            .andExpect(jsonPath("$.[*].categoria").value(hasItem(DEFAULT_CATEGORIA.toString())));
    }
    
    @Test
    @Transactional
    public void getInsumo() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        // Get the insumo
        restInsumoMockMvc.perform(get("/api/insumos/{id}", insumo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(insumo.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.qtdEstoque").value(DEFAULT_QTD_ESTOQUE.doubleValue()))
            .andExpect(jsonPath("$.custoPorUnidade").value(DEFAULT_CUSTO_POR_UNIDADE.doubleValue()))
            .andExpect(jsonPath("$.categoria").value(DEFAULT_CATEGORIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInsumo() throws Exception {
        // Get the insumo
        restInsumoMockMvc.perform(get("/api/insumos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInsumo() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();

        // Update the insumo
        Insumo updatedInsumo = insumoRepository.findById(insumo.getId()).get();
        // Disconnect from session so that the updates on updatedInsumo are not directly saved in db
        em.detach(updatedInsumo);
        updatedInsumo
            .nome(UPDATED_NOME)
            .qtdEstoque(UPDATED_QTD_ESTOQUE)
            .custoPorUnidade(UPDATED_CUSTO_POR_UNIDADE)
            .categoria(UPDATED_CATEGORIA);

        restInsumoMockMvc.perform(put("/api/insumos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInsumo)))
            .andExpect(status().isOk());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
        Insumo testInsumo = insumoList.get(insumoList.size() - 1);
        assertThat(testInsumo.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testInsumo.getQtdEstoque()).isEqualTo(UPDATED_QTD_ESTOQUE);
        assertThat(testInsumo.getCustoPorUnidade()).isEqualTo(UPDATED_CUSTO_POR_UNIDADE);
        assertThat(testInsumo.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
    }

    @Test
    @Transactional
    public void updateNonExistingInsumo() throws Exception {
        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();

        // Create the Insumo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInsumoMockMvc.perform(put("/api/insumos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(insumo)))
            .andExpect(status().isBadRequest());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInsumo() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        int databaseSizeBeforeDelete = insumoRepository.findAll().size();

        // Delete the insumo
        restInsumoMockMvc.perform(delete("/api/insumos/{id}", insumo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Insumo.class);
        Insumo insumo1 = new Insumo();
        insumo1.setId(1L);
        Insumo insumo2 = new Insumo();
        insumo2.setId(insumo1.getId());
        assertThat(insumo1).isEqualTo(insumo2);
        insumo2.setId(2L);
        assertThat(insumo1).isNotEqualTo(insumo2);
        insumo1.setId(null);
        assertThat(insumo1).isNotEqualTo(insumo2);
    }
}
