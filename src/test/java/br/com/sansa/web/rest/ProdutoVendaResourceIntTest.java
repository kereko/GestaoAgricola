package br.com.sansa.web.rest;

import br.com.sansa.GestaoAgricolaApp;

import br.com.sansa.domain.ProdutoVenda;
import br.com.sansa.repository.ProdutoVendaRepository;
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
 * Test class for the ProdutoVendaResource REST controller.
 *
 * @see ProdutoVendaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoAgricolaApp.class)
public class ProdutoVendaResourceIntTest {

    private static final Double DEFAULT_PRECO = 1D;
    private static final Double UPDATED_PRECO = 2D;

    @Autowired
    private ProdutoVendaRepository produtoVendaRepository;

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

    private MockMvc restProdutoVendaMockMvc;

    private ProdutoVenda produtoVenda;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProdutoVendaResource produtoVendaResource = new ProdutoVendaResource(produtoVendaRepository);
        this.restProdutoVendaMockMvc = MockMvcBuilders.standaloneSetup(produtoVendaResource)
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
    public static ProdutoVenda createEntity(EntityManager em) {
        ProdutoVenda produtoVenda = new ProdutoVenda()
            .preco(DEFAULT_PRECO);
        return produtoVenda;
    }

    @Before
    public void initTest() {
        produtoVenda = createEntity(em);
    }

    @Test
    @Transactional
    public void createProdutoVenda() throws Exception {
        int databaseSizeBeforeCreate = produtoVendaRepository.findAll().size();

        // Create the ProdutoVenda
        restProdutoVendaMockMvc.perform(post("/api/produto-vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoVenda)))
            .andExpect(status().isCreated());

        // Validate the ProdutoVenda in the database
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeCreate + 1);
        ProdutoVenda testProdutoVenda = produtoVendaList.get(produtoVendaList.size() - 1);
        assertThat(testProdutoVenda.getPreco()).isEqualTo(DEFAULT_PRECO);
    }

    @Test
    @Transactional
    public void createProdutoVendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produtoVendaRepository.findAll().size();

        // Create the ProdutoVenda with an existing ID
        produtoVenda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdutoVendaMockMvc.perform(post("/api/produto-vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoVenda)))
            .andExpect(status().isBadRequest());

        // Validate the ProdutoVenda in the database
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProdutoVendas() throws Exception {
        // Initialize the database
        produtoVendaRepository.saveAndFlush(produtoVenda);

        // Get all the produtoVendaList
        restProdutoVendaMockMvc.perform(get("/api/produto-vendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produtoVenda.getId().intValue())))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getProdutoVenda() throws Exception {
        // Initialize the database
        produtoVendaRepository.saveAndFlush(produtoVenda);

        // Get the produtoVenda
        restProdutoVendaMockMvc.perform(get("/api/produto-vendas/{id}", produtoVenda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(produtoVenda.getId().intValue()))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProdutoVenda() throws Exception {
        // Get the produtoVenda
        restProdutoVendaMockMvc.perform(get("/api/produto-vendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProdutoVenda() throws Exception {
        // Initialize the database
        produtoVendaRepository.saveAndFlush(produtoVenda);

        int databaseSizeBeforeUpdate = produtoVendaRepository.findAll().size();

        // Update the produtoVenda
        ProdutoVenda updatedProdutoVenda = produtoVendaRepository.findById(produtoVenda.getId()).get();
        // Disconnect from session so that the updates on updatedProdutoVenda are not directly saved in db
        em.detach(updatedProdutoVenda);
        updatedProdutoVenda
            .preco(UPDATED_PRECO);

        restProdutoVendaMockMvc.perform(put("/api/produto-vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProdutoVenda)))
            .andExpect(status().isOk());

        // Validate the ProdutoVenda in the database
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeUpdate);
        ProdutoVenda testProdutoVenda = produtoVendaList.get(produtoVendaList.size() - 1);
        assertThat(testProdutoVenda.getPreco()).isEqualTo(UPDATED_PRECO);
    }

    @Test
    @Transactional
    public void updateNonExistingProdutoVenda() throws Exception {
        int databaseSizeBeforeUpdate = produtoVendaRepository.findAll().size();

        // Create the ProdutoVenda

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutoVendaMockMvc.perform(put("/api/produto-vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoVenda)))
            .andExpect(status().isBadRequest());

        // Validate the ProdutoVenda in the database
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProdutoVenda() throws Exception {
        // Initialize the database
        produtoVendaRepository.saveAndFlush(produtoVenda);

        int databaseSizeBeforeDelete = produtoVendaRepository.findAll().size();

        // Delete the produtoVenda
        restProdutoVendaMockMvc.perform(delete("/api/produto-vendas/{id}", produtoVenda.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdutoVenda.class);
        ProdutoVenda produtoVenda1 = new ProdutoVenda();
        produtoVenda1.setId(1L);
        ProdutoVenda produtoVenda2 = new ProdutoVenda();
        produtoVenda2.setId(produtoVenda1.getId());
        assertThat(produtoVenda1).isEqualTo(produtoVenda2);
        produtoVenda2.setId(2L);
        assertThat(produtoVenda1).isNotEqualTo(produtoVenda2);
        produtoVenda1.setId(null);
        assertThat(produtoVenda1).isNotEqualTo(produtoVenda2);
    }
}
