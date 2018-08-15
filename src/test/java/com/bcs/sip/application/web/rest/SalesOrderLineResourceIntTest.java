package com.bcs.sip.application.web.rest;

import com.bcs.sip.application.SipApp;

import com.bcs.sip.application.domain.SalesOrderLine;
import com.bcs.sip.application.repository.SalesOrderLineRepository;
import com.bcs.sip.application.service.SalesOrderLineService;
import com.bcs.sip.application.service.dto.SalesOrderLineDTO;
import com.bcs.sip.application.service.mapper.SalesOrderLineMapper;
import com.bcs.sip.application.web.rest.errors.ExceptionTranslator;

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

import javax.persistence.EntityManager;
import java.util.List;


import static com.bcs.sip.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SalesOrderLineResource REST controller.
 *
 * @see SalesOrderLineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SipApp.class)
public class SalesOrderLineResourceIntTest {

    private static final Integer DEFAULT_QTY = 1;
    private static final Integer UPDATED_QTY = 2;

    @Autowired
    private SalesOrderLineRepository salesOrderLineRepository;


    @Autowired
    private SalesOrderLineMapper salesOrderLineMapper;
    

    @Autowired
    private SalesOrderLineService salesOrderLineService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSalesOrderLineMockMvc;

    private SalesOrderLine salesOrderLine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SalesOrderLineResource salesOrderLineResource = new SalesOrderLineResource(salesOrderLineService);
        this.restSalesOrderLineMockMvc = MockMvcBuilders.standaloneSetup(salesOrderLineResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalesOrderLine createEntity(EntityManager em) {
        SalesOrderLine salesOrderLine = new SalesOrderLine()
            .qty(DEFAULT_QTY);
        return salesOrderLine;
    }

    @Before
    public void initTest() {
        salesOrderLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalesOrderLine() throws Exception {
        int databaseSizeBeforeCreate = salesOrderLineRepository.findAll().size();

        // Create the SalesOrderLine
        SalesOrderLineDTO salesOrderLineDTO = salesOrderLineMapper.toDto(salesOrderLine);
        restSalesOrderLineMockMvc.perform(post("/api/sales-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderLineDTO)))
            .andExpect(status().isCreated());

        // Validate the SalesOrderLine in the database
        List<SalesOrderLine> salesOrderLineList = salesOrderLineRepository.findAll();
        assertThat(salesOrderLineList).hasSize(databaseSizeBeforeCreate + 1);
        SalesOrderLine testSalesOrderLine = salesOrderLineList.get(salesOrderLineList.size() - 1);
        assertThat(testSalesOrderLine.getQty()).isEqualTo(DEFAULT_QTY);
    }

    @Test
    @Transactional
    public void createSalesOrderLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salesOrderLineRepository.findAll().size();

        // Create the SalesOrderLine with an existing ID
        salesOrderLine.setId(1L);
        SalesOrderLineDTO salesOrderLineDTO = salesOrderLineMapper.toDto(salesOrderLine);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalesOrderLineMockMvc.perform(post("/api/sales-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SalesOrderLine in the database
        List<SalesOrderLine> salesOrderLineList = salesOrderLineRepository.findAll();
        assertThat(salesOrderLineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkQtyIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderLineRepository.findAll().size();
        // set the field null
        salesOrderLine.setQty(null);

        // Create the SalesOrderLine, which fails.
        SalesOrderLineDTO salesOrderLineDTO = salesOrderLineMapper.toDto(salesOrderLine);

        restSalesOrderLineMockMvc.perform(post("/api/sales-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderLineDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrderLine> salesOrderLineList = salesOrderLineRepository.findAll();
        assertThat(salesOrderLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSalesOrderLines() throws Exception {
        // Initialize the database
        salesOrderLineRepository.saveAndFlush(salesOrderLine);

        // Get all the salesOrderLineList
        restSalesOrderLineMockMvc.perform(get("/api/sales-order-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salesOrderLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].qty").value(hasItem(DEFAULT_QTY)));
    }
    

    @Test
    @Transactional
    public void getSalesOrderLine() throws Exception {
        // Initialize the database
        salesOrderLineRepository.saveAndFlush(salesOrderLine);

        // Get the salesOrderLine
        restSalesOrderLineMockMvc.perform(get("/api/sales-order-lines/{id}", salesOrderLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(salesOrderLine.getId().intValue()))
            .andExpect(jsonPath("$.qty").value(DEFAULT_QTY));
    }
    @Test
    @Transactional
    public void getNonExistingSalesOrderLine() throws Exception {
        // Get the salesOrderLine
        restSalesOrderLineMockMvc.perform(get("/api/sales-order-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalesOrderLine() throws Exception {
        // Initialize the database
        salesOrderLineRepository.saveAndFlush(salesOrderLine);

        int databaseSizeBeforeUpdate = salesOrderLineRepository.findAll().size();

        // Update the salesOrderLine
        SalesOrderLine updatedSalesOrderLine = salesOrderLineRepository.findById(salesOrderLine.getId()).get();
        // Disconnect from session so that the updates on updatedSalesOrderLine are not directly saved in db
        em.detach(updatedSalesOrderLine);
        updatedSalesOrderLine
            .qty(UPDATED_QTY);
        SalesOrderLineDTO salesOrderLineDTO = salesOrderLineMapper.toDto(updatedSalesOrderLine);

        restSalesOrderLineMockMvc.perform(put("/api/sales-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderLineDTO)))
            .andExpect(status().isOk());

        // Validate the SalesOrderLine in the database
        List<SalesOrderLine> salesOrderLineList = salesOrderLineRepository.findAll();
        assertThat(salesOrderLineList).hasSize(databaseSizeBeforeUpdate);
        SalesOrderLine testSalesOrderLine = salesOrderLineList.get(salesOrderLineList.size() - 1);
        assertThat(testSalesOrderLine.getQty()).isEqualTo(UPDATED_QTY);
    }

    @Test
    @Transactional
    public void updateNonExistingSalesOrderLine() throws Exception {
        int databaseSizeBeforeUpdate = salesOrderLineRepository.findAll().size();

        // Create the SalesOrderLine
        SalesOrderLineDTO salesOrderLineDTO = salesOrderLineMapper.toDto(salesOrderLine);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restSalesOrderLineMockMvc.perform(put("/api/sales-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SalesOrderLine in the database
        List<SalesOrderLine> salesOrderLineList = salesOrderLineRepository.findAll();
        assertThat(salesOrderLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSalesOrderLine() throws Exception {
        // Initialize the database
        salesOrderLineRepository.saveAndFlush(salesOrderLine);

        int databaseSizeBeforeDelete = salesOrderLineRepository.findAll().size();

        // Get the salesOrderLine
        restSalesOrderLineMockMvc.perform(delete("/api/sales-order-lines/{id}", salesOrderLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SalesOrderLine> salesOrderLineList = salesOrderLineRepository.findAll();
        assertThat(salesOrderLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalesOrderLine.class);
        SalesOrderLine salesOrderLine1 = new SalesOrderLine();
        salesOrderLine1.setId(1L);
        SalesOrderLine salesOrderLine2 = new SalesOrderLine();
        salesOrderLine2.setId(salesOrderLine1.getId());
        assertThat(salesOrderLine1).isEqualTo(salesOrderLine2);
        salesOrderLine2.setId(2L);
        assertThat(salesOrderLine1).isNotEqualTo(salesOrderLine2);
        salesOrderLine1.setId(null);
        assertThat(salesOrderLine1).isNotEqualTo(salesOrderLine2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalesOrderLineDTO.class);
        SalesOrderLineDTO salesOrderLineDTO1 = new SalesOrderLineDTO();
        salesOrderLineDTO1.setId(1L);
        SalesOrderLineDTO salesOrderLineDTO2 = new SalesOrderLineDTO();
        assertThat(salesOrderLineDTO1).isNotEqualTo(salesOrderLineDTO2);
        salesOrderLineDTO2.setId(salesOrderLineDTO1.getId());
        assertThat(salesOrderLineDTO1).isEqualTo(salesOrderLineDTO2);
        salesOrderLineDTO2.setId(2L);
        assertThat(salesOrderLineDTO1).isNotEqualTo(salesOrderLineDTO2);
        salesOrderLineDTO1.setId(null);
        assertThat(salesOrderLineDTO1).isNotEqualTo(salesOrderLineDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(salesOrderLineMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(salesOrderLineMapper.fromId(null)).isNull();
    }
}
