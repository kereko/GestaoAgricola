package br.com.sansa.web.rest;

import br.com.sansa.GestaoAgricolaApp;

import br.com.sansa.domain.InsumoConsumido;
import br.com.sansa.repository.InsumoConsumidoRepository;
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
 * Test class for the InsumoConsumidoResource REST controller.
 *
 * @see InsumoConsumidoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoAgricolaApp.class)
public class InsumoConsumidoResourceIntTest {

    private static final Double DEFAULT_QUANTIDADE = 1D;
    private static final Double UPDATED_QUANTIDADE = 2D;

    private static final Double DEFAULT_CUSTO_TOTAL = 1D;
    private static final Double UPDATED_CUSTO_TOTAL = 2D;

    @Autowired
    private InsumoConsumidoRepository insumoConsumidoRepository;

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

    private MockMvc restInsumoConsumidoMockMvc;

    private InsumoConsumido insumoConsumido;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InsumoConsumidoResource insumoConsumidoResource = new InsumoConsumidoResource(insumoConsumidoRepository);
        this.restInsumoConsumidoMockMvc = MockMvcBuilders.standaloneSetup(insumoConsumidoResource)
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
    public static InsumoConsumido createEntity(EntityManager em) {
        InsumoConsumido insumoConsumido = new InsumoConsumido()
            .quantidade(DEFAULT_QUANTIDADE)
            .custoTotal(DEFAULT_CUSTO_TOTAL);
        return insumoConsumido;
    }

    @Before
    public void initTest() {
        insumoConsumido = createEntity(em);
    }

    @Test
    @Transactional
    public void createInsumoConsumido() throws Exception {
        int databaseSizeBeforeCreate = insumoConsumidoRepository.findAll().size();

        // Create the InsumoConsumido
        restInsumoConsumidoMockMvc.perform(post("/api/insumo-consumidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(insumoConsumido)))
            .andExpect(status().isCreated());

        // Validate the InsumoConsumido in the database
        List<InsumoConsumido> insumoConsumidoList = insumoConsumidoRepository.findAll();
        assertThat(insumoConsumidoList).hasSize(databaseSizeBeforeCreate + 1);
        InsumoConsumido testInsumoConsumido = insumoConsumidoList.get(insumoConsumidoList.size() - 1);
        assertThat(testInsumoConsumido.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testInsumoConsumido.getCustoTotal()).isEqualTo(DEFAULT_CUSTO_TOTAL);
    }

    @Test
    @Transactional
    public void createInsumoConsumidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = insumoConsumidoRepository.findAll().size();

        // Create the InsumoConsumido with an existing ID
        insumoConsumido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInsumoConsumidoMockMvc.perform(post("/api/insumo-consumidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(insumoConsumido)))
            .andExpect(status().isBadRequest());

        // Validate the InsumoConsumido in the database
        List<InsumoConsumido> insumoConsumidoList = insumoConsumidoRepository.findAll();
        assertThat(insumoConsumidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInsumoConsumidos() throws Exception {
        // Initialize the database
        insumoConsumidoRepository.saveAndFlush(insumoConsumido);

        // Get all the insumoConsumidoList
        restInsumoConsumidoMockMvc.perform(get("/api/insumo-consumidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(insumoConsumido.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE.doubleValue())))
            .andExpect(jsonPath("$.[*].custoTotal").value(hasItem(DEFAULT_CUSTO_TOTAL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getInsumoConsumido() throws Exception {
        // Initialize the database
        insumoConsumidoRepository.saveAndFlush(insumoConsumido);

        // Get the insumoConsumido
        restInsumoConsumidoMockMvc.perform(get("/api/insumo-consumidos/{id}", insumoConsumido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(insumoConsumido.getId().intValue()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE.doubleValue()))
            .andExpect(jsonPath("$.custoTotal").value(DEFAULT_CUSTO_TOTAL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInsumoConsumido() throws Exception {
        // Get the insumoConsumido
        restInsumoConsumidoMockMvc.perform(get("/api/insumo-consumidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInsumoConsumido() throws Exception {
        // Initialize the database
        insumoConsumidoRepository.saveAndFlush(insumoConsumido);

        int databaseSizeBeforeUpdate = insumoConsumidoRepository.findAll().size();

        // Update the insumoConsumido
        InsumoConsumido updatedInsumoConsumido = insumoConsumidoRepository.findById(insumoConsumido.getId()).get();
        // Disconnect from session so that the updates on updatedInsumoConsumido are not directly saved in db
        em.detach(updatedInsumoConsumido);
        updatedInsumoConsumido
            .quantidade(UPDATED_QUANTIDADE)
            .custoTotal(UPDATED_CUSTO_TOTAL);

        restInsumoConsumidoMockMvc.perform(put("/api/insumo-consumidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInsumoConsumido)))
            .andExpect(status().isOk());

        // Validate the InsumoConsumido in the database
        List<InsumoConsumido> insumoConsumidoList = insumoConsumidoRepository.findAll();
        assertThat(insumoConsumidoList).hasSize(databaseSizeBeforeUpdate);
        InsumoConsumido testInsumoConsumido = insumoConsumidoList.get(insumoConsumidoList.size() - 1);
        assertThat(testInsumoConsumido.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testInsumoConsumido.getCustoTotal()).isEqualTo(UPDATED_CUSTO_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingInsumoConsumido() throws Exception {
        int databaseSizeBeforeUpdate = insumoConsumidoRepository.findAll().size();

        // Create the InsumoConsumido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInsumoConsumidoMockMvc.perform(put("/api/insumo-consumidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(insumoConsumido)))
            .andExpect(status().isBadRequest());

        // Validate the InsumoConsumido in the database
        List<InsumoConsumido> insumoConsumidoList = insumoConsumidoRepository.findAll();
        assertThat(insumoConsumidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInsumoConsumido() throws Exception {
        // Initialize the database
        insumoConsumidoRepository.saveAndFlush(insumoConsumido);

        int databaseSizeBeforeDelete = insumoConsumidoRepository.findAll().size();

        // Delete the insumoConsumido
        restInsumoConsumidoMockMvc.perform(delete("/api/insumo-consumidos/{id}", insumoConsumido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InsumoConsumido> insumoConsumidoList = insumoConsumidoRepository.findAll();
        assertThat(insumoConsumidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InsumoConsumido.class);
        InsumoConsumido insumoConsumido1 = new InsumoConsumido();
        insumoConsumido1.setId(1L);
        InsumoConsumido insumoConsumido2 = new InsumoConsumido();
        insumoConsumido2.setId(insumoConsumido1.getId());
        assertThat(insumoConsumido1).isEqualTo(insumoConsumido2);
        insumoConsumido2.setId(2L);
        assertThat(insumoConsumido1).isNotEqualTo(insumoConsumido2);
        insumoConsumido1.setId(null);
        assertThat(insumoConsumido1).isNotEqualTo(insumoConsumido2);
    }
}
