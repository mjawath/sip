package com.bcs.sip.application.web.rest;

import com.bcs.sip.application.SipApp;

import com.bcs.sip.application.domain.SKU;
import com.bcs.sip.application.repository.SKURepository;
import com.bcs.sip.application.service.SKUService;
import com.bcs.sip.application.service.dto.SKUDTO;
import com.bcs.sip.application.service.mapper.SKUMapper;
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
 * Test class for the SKUResource REST controller.
 *
 * @see SKUResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SipApp.class)
public class SKUResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private SKURepository sKURepository;


    @Autowired
    private SKUMapper sKUMapper;
    

    @Autowired
    private SKUService sKUService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSKUMockMvc;

    private SKU sKU;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SKUResource sKUResource = new SKUResource(sKUService);
        this.restSKUMockMvc = MockMvcBuilders.standaloneSetup(sKUResource)
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
    public static SKU createEntity(EntityManager em) {
        SKU sKU = new SKU()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE);
        return sKU;
    }

    @Before
    public void initTest() {
        sKU = createEntity(em);
    }

    @Test
    @Transactional
    public void createSKU() throws Exception {
        int databaseSizeBeforeCreate = sKURepository.findAll().size();

        // Create the SKU
        SKUDTO sKUDTO = sKUMapper.toDto(sKU);
        restSKUMockMvc.perform(post("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isCreated());

        // Validate the SKU in the database
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeCreate + 1);
        SKU testSKU = sKUList.get(sKUList.size() - 1);
        assertThat(testSKU.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSKU.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createSKUWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sKURepository.findAll().size();

        // Create the SKU with an existing ID
        sKU.setId(1L);
        SKUDTO sKUDTO = sKUMapper.toDto(sKU);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSKUMockMvc.perform(post("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SKU in the database
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = sKURepository.findAll().size();
        // set the field null
        sKU.setCode(null);

        // Create the SKU, which fails.
        SKUDTO sKUDTO = sKUMapper.toDto(sKU);

        restSKUMockMvc.perform(post("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isBadRequest());

        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSKUS() throws Exception {
        // Initialize the database
        sKURepository.saveAndFlush(sKU);

        // Get all the sKUList
        restSKUMockMvc.perform(get("/api/skus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sKU.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }
    

    @Test
    @Transactional
    public void getSKU() throws Exception {
        // Initialize the database
        sKURepository.saveAndFlush(sKU);

        // Get the sKU
        restSKUMockMvc.perform(get("/api/skus/{id}", sKU.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sKU.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSKU() throws Exception {
        // Get the sKU
        restSKUMockMvc.perform(get("/api/skus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSKU() throws Exception {
        // Initialize the database
        sKURepository.saveAndFlush(sKU);

        int databaseSizeBeforeUpdate = sKURepository.findAll().size();

        // Update the sKU
        SKU updatedSKU = sKURepository.findById(sKU.getId()).get();
        // Disconnect from session so that the updates on updatedSKU are not directly saved in db
        em.detach(updatedSKU);
        updatedSKU
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);
        SKUDTO sKUDTO = sKUMapper.toDto(updatedSKU);

        restSKUMockMvc.perform(put("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isOk());

        // Validate the SKU in the database
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeUpdate);
        SKU testSKU = sKUList.get(sKUList.size() - 1);
        assertThat(testSKU.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSKU.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingSKU() throws Exception {
        int databaseSizeBeforeUpdate = sKURepository.findAll().size();

        // Create the SKU
        SKUDTO sKUDTO = sKUMapper.toDto(sKU);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restSKUMockMvc.perform(put("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SKU in the database
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSKU() throws Exception {
        // Initialize the database
        sKURepository.saveAndFlush(sKU);

        int databaseSizeBeforeDelete = sKURepository.findAll().size();

        // Get the sKU
        restSKUMockMvc.perform(delete("/api/skus/{id}", sKU.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SKU.class);
        SKU sKU1 = new SKU();
        sKU1.setId(1L);
        SKU sKU2 = new SKU();
        sKU2.setId(sKU1.getId());
        assertThat(sKU1).isEqualTo(sKU2);
        sKU2.setId(2L);
        assertThat(sKU1).isNotEqualTo(sKU2);
        sKU1.setId(null);
        assertThat(sKU1).isNotEqualTo(sKU2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SKUDTO.class);
        SKUDTO sKUDTO1 = new SKUDTO();
        sKUDTO1.setId(1L);
        SKUDTO sKUDTO2 = new SKUDTO();
        assertThat(sKUDTO1).isNotEqualTo(sKUDTO2);
        sKUDTO2.setId(sKUDTO1.getId());
        assertThat(sKUDTO1).isEqualTo(sKUDTO2);
        sKUDTO2.setId(2L);
        assertThat(sKUDTO1).isNotEqualTo(sKUDTO2);
        sKUDTO1.setId(null);
        assertThat(sKUDTO1).isNotEqualTo(sKUDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sKUMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sKUMapper.fromId(null)).isNull();
    }
}
