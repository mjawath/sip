package com.bcs.sip.application.web.rest;

import com.bcs.sip.application.SipApp;

import com.bcs.sip.application.domain.PurchaseOrderLine;
import com.bcs.sip.application.repository.PurchaseOrderLineRepository;
import com.bcs.sip.application.service.PurchaseOrderLineService;
import com.bcs.sip.application.service.dto.PurchaseOrderLineDTO;
import com.bcs.sip.application.service.mapper.PurchaseOrderLineMapper;
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
 * Test class for the PurchaseOrderLineResource REST controller.
 *
 * @see PurchaseOrderLineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SipApp.class)
public class PurchaseOrderLineResourceIntTest {

    private static final Integer DEFAULT_QTY = 1;
    private static final Integer UPDATED_QTY = 2;

    @Autowired
    private PurchaseOrderLineRepository purchaseOrderLineRepository;


    @Autowired
    private PurchaseOrderLineMapper purchaseOrderLineMapper;
    

    @Autowired
    private PurchaseOrderLineService purchaseOrderLineService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPurchaseOrderLineMockMvc;

    private PurchaseOrderLine purchaseOrderLine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PurchaseOrderLineResource purchaseOrderLineResource = new PurchaseOrderLineResource(purchaseOrderLineService);
        this.restPurchaseOrderLineMockMvc = MockMvcBuilders.standaloneSetup(purchaseOrderLineResource)
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
    public static PurchaseOrderLine createEntity(EntityManager em) {
        PurchaseOrderLine purchaseOrderLine = new PurchaseOrderLine()
            .qty(DEFAULT_QTY);
        return purchaseOrderLine;
    }

    @Before
    public void initTest() {
        purchaseOrderLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseOrderLine() throws Exception {
        int databaseSizeBeforeCreate = purchaseOrderLineRepository.findAll().size();

        // Create the PurchaseOrderLine
        PurchaseOrderLineDTO purchaseOrderLineDTO = purchaseOrderLineMapper.toDto(purchaseOrderLine);
        restPurchaseOrderLineMockMvc.perform(post("/api/purchase-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrderLineDTO)))
            .andExpect(status().isCreated());

        // Validate the PurchaseOrderLine in the database
        List<PurchaseOrderLine> purchaseOrderLineList = purchaseOrderLineRepository.findAll();
        assertThat(purchaseOrderLineList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseOrderLine testPurchaseOrderLine = purchaseOrderLineList.get(purchaseOrderLineList.size() - 1);
        assertThat(testPurchaseOrderLine.getQty()).isEqualTo(DEFAULT_QTY);
    }

    @Test
    @Transactional
    public void createPurchaseOrderLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseOrderLineRepository.findAll().size();

        // Create the PurchaseOrderLine with an existing ID
        purchaseOrderLine.setId(1L);
        PurchaseOrderLineDTO purchaseOrderLineDTO = purchaseOrderLineMapper.toDto(purchaseOrderLine);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseOrderLineMockMvc.perform(post("/api/purchase-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrderLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrderLine in the database
        List<PurchaseOrderLine> purchaseOrderLineList = purchaseOrderLineRepository.findAll();
        assertThat(purchaseOrderLineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkQtyIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseOrderLineRepository.findAll().size();
        // set the field null
        purchaseOrderLine.setQty(null);

        // Create the PurchaseOrderLine, which fails.
        PurchaseOrderLineDTO purchaseOrderLineDTO = purchaseOrderLineMapper.toDto(purchaseOrderLine);

        restPurchaseOrderLineMockMvc.perform(post("/api/purchase-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrderLineDTO)))
            .andExpect(status().isBadRequest());

        List<PurchaseOrderLine> purchaseOrderLineList = purchaseOrderLineRepository.findAll();
        assertThat(purchaseOrderLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPurchaseOrderLines() throws Exception {
        // Initialize the database
        purchaseOrderLineRepository.saveAndFlush(purchaseOrderLine);

        // Get all the purchaseOrderLineList
        restPurchaseOrderLineMockMvc.perform(get("/api/purchase-order-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseOrderLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].qty").value(hasItem(DEFAULT_QTY)));
    }
    

    @Test
    @Transactional
    public void getPurchaseOrderLine() throws Exception {
        // Initialize the database
        purchaseOrderLineRepository.saveAndFlush(purchaseOrderLine);

        // Get the purchaseOrderLine
        restPurchaseOrderLineMockMvc.perform(get("/api/purchase-order-lines/{id}", purchaseOrderLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseOrderLine.getId().intValue()))
            .andExpect(jsonPath("$.qty").value(DEFAULT_QTY));
    }
    @Test
    @Transactional
    public void getNonExistingPurchaseOrderLine() throws Exception {
        // Get the purchaseOrderLine
        restPurchaseOrderLineMockMvc.perform(get("/api/purchase-order-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseOrderLine() throws Exception {
        // Initialize the database
        purchaseOrderLineRepository.saveAndFlush(purchaseOrderLine);

        int databaseSizeBeforeUpdate = purchaseOrderLineRepository.findAll().size();

        // Update the purchaseOrderLine
        PurchaseOrderLine updatedPurchaseOrderLine = purchaseOrderLineRepository.findById(purchaseOrderLine.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseOrderLine are not directly saved in db
        em.detach(updatedPurchaseOrderLine);
        updatedPurchaseOrderLine
            .qty(UPDATED_QTY);
        PurchaseOrderLineDTO purchaseOrderLineDTO = purchaseOrderLineMapper.toDto(updatedPurchaseOrderLine);

        restPurchaseOrderLineMockMvc.perform(put("/api/purchase-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrderLineDTO)))
            .andExpect(status().isOk());

        // Validate the PurchaseOrderLine in the database
        List<PurchaseOrderLine> purchaseOrderLineList = purchaseOrderLineRepository.findAll();
        assertThat(purchaseOrderLineList).hasSize(databaseSizeBeforeUpdate);
        PurchaseOrderLine testPurchaseOrderLine = purchaseOrderLineList.get(purchaseOrderLineList.size() - 1);
        assertThat(testPurchaseOrderLine.getQty()).isEqualTo(UPDATED_QTY);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseOrderLine() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderLineRepository.findAll().size();

        // Create the PurchaseOrderLine
        PurchaseOrderLineDTO purchaseOrderLineDTO = purchaseOrderLineMapper.toDto(purchaseOrderLine);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restPurchaseOrderLineMockMvc.perform(put("/api/purchase-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrderLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrderLine in the database
        List<PurchaseOrderLine> purchaseOrderLineList = purchaseOrderLineRepository.findAll();
        assertThat(purchaseOrderLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseOrderLine() throws Exception {
        // Initialize the database
        purchaseOrderLineRepository.saveAndFlush(purchaseOrderLine);

        int databaseSizeBeforeDelete = purchaseOrderLineRepository.findAll().size();

        // Get the purchaseOrderLine
        restPurchaseOrderLineMockMvc.perform(delete("/api/purchase-order-lines/{id}", purchaseOrderLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PurchaseOrderLine> purchaseOrderLineList = purchaseOrderLineRepository.findAll();
        assertThat(purchaseOrderLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseOrderLine.class);
        PurchaseOrderLine purchaseOrderLine1 = new PurchaseOrderLine();
        purchaseOrderLine1.setId(1L);
        PurchaseOrderLine purchaseOrderLine2 = new PurchaseOrderLine();
        purchaseOrderLine2.setId(purchaseOrderLine1.getId());
        assertThat(purchaseOrderLine1).isEqualTo(purchaseOrderLine2);
        purchaseOrderLine2.setId(2L);
        assertThat(purchaseOrderLine1).isNotEqualTo(purchaseOrderLine2);
        purchaseOrderLine1.setId(null);
        assertThat(purchaseOrderLine1).isNotEqualTo(purchaseOrderLine2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseOrderLineDTO.class);
        PurchaseOrderLineDTO purchaseOrderLineDTO1 = new PurchaseOrderLineDTO();
        purchaseOrderLineDTO1.setId(1L);
        PurchaseOrderLineDTO purchaseOrderLineDTO2 = new PurchaseOrderLineDTO();
        assertThat(purchaseOrderLineDTO1).isNotEqualTo(purchaseOrderLineDTO2);
        purchaseOrderLineDTO2.setId(purchaseOrderLineDTO1.getId());
        assertThat(purchaseOrderLineDTO1).isEqualTo(purchaseOrderLineDTO2);
        purchaseOrderLineDTO2.setId(2L);
        assertThat(purchaseOrderLineDTO1).isNotEqualTo(purchaseOrderLineDTO2);
        purchaseOrderLineDTO1.setId(null);
        assertThat(purchaseOrderLineDTO1).isNotEqualTo(purchaseOrderLineDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(purchaseOrderLineMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(purchaseOrderLineMapper.fromId(null)).isNull();
    }
}
