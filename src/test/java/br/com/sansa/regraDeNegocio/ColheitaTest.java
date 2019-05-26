package br.com.sansa.regraDeNegocio;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;

import javax.persistence.EntityManager;

import br.com.sansa.GestaoAgricolaApp;
import br.com.sansa.domain.Colheita;
import br.com.sansa.domain.Fazenda;
import br.com.sansa.domain.Plantio;
import br.com.sansa.domain.Talhao;
import br.com.sansa.repository.ColheitaRepository;
import br.com.sansa.repository.PlantioRepository;
import br.com.sansa.web.rest.ColheitaResource;
import br.com.sansa.web.rest.ColheitaResourceIntTest;
import br.com.sansa.web.rest.FazendaResourceIntTest;
import br.com.sansa.web.rest.PlantioResourceIntTest;
import br.com.sansa.web.rest.TalhaoResourceIntTest;
import br.com.sansa.web.rest.errors.ExceptionTranslator;

import static br.com.sansa.web.rest.TestUtil.createFormattingConversionService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestaoAgricolaApp.class)
public class ColheitaTest {
    private static final LocalDate DEFAULT_DATA_COLHEITA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_COLHEITA = LocalDate.now(ZoneId.systemDefault());
    private static final Double DEFAULT_PRODUTIVIDADE = 1D;
    private static final Double UPDATED_PRODUTIVIDADE = 2D;

    @Autowired
    private ColheitaRepository colheitaRepository;
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
    private MockMvc restColheitaMockMvc;
    private MockMvc restPlantioMockMvc;
    private Colheita colheita;
    private Plantio plantio;
    private Talhao talhao;
    private Fazenda fazenda;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColheitaResource colheitaResource = new ColheitaResource(colheitaRepository);
        this.restColheitaMockMvc = MockMvcBuilders.standaloneSetup(colheitaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    @Before
    public void initTest() {
        colheita = ColheitaResourceIntTest.mockEntity(em);
        plantio = PlantioResourceIntTest.mockEntity(em);
    }

    /**
     * Testar se a data da colheita é valida
     *
     * A data do plantio deve ser anterior a data da colheita;
     * Se a data do plantio for maior ou igual a colheita, a entidade
     * Colheita não aceitará o Plantio
     */
    @Test
    public void validarDataDoPlantioNaColheitaTest() throws Exception {
        colheita = ColheitaResourceIntTest.mockEntity(em);
        plantio = PlantioResourceIntTest.mockEntity(em);
        LocalDate dataPlantio = LocalDate.of(2019, Month.APRIL,25);
        LocalDate dataColheita = LocalDate.of(2019, Month.MAY,30);
        plantio.setDataPlantio(dataPlantio);
        colheita.setDataColheita(dataColheita);
        colheita.setPlantio(plantio);
        assertThat(colheita.getPlantio()).isEqualTo(plantio);

        LocalDate dataErradaPlantio = LocalDate.of(2020, Month.AUGUST,12);
        LocalDate dataErradaColheita = LocalDate.of(2018, Month.APRIL,23);
        colheita = ColheitaResourceIntTest.mockEntity(em);
        plantio = PlantioResourceIntTest.mockEntity(em);
        plantio.setDataPlantio(dataErradaPlantio);
        colheita.setDataColheita(dataErradaColheita);
        colheita.setPlantio(plantio);
        assertThat(colheita.getPlantio()).isEqualTo(null);
        System.out.println("Teste de colheita data passou");
    }

    @Test public void validarTalhaoFazenda(){
        talhao = TalhaoResourceIntTest.createEntity(em);
        fazenda = FazendaResourceIntTest.createEntity(em);

    }

}
