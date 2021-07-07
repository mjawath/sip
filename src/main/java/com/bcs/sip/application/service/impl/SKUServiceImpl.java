package com.bcs.sip.application.service.impl;

import com.bcs.sip.application.service.SKUService;
import com.bcs.sip.application.domain.SKU;
import com.bcs.sip.application.repository.SKURepository;
import com.bcs.sip.application.service.dto.SKUDTO;
import com.bcs.sip.application.service.mapper.SKUMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing SKU.
 */
@Service
@Transactional
public class SKUServiceImpl implements SKUService {

    private final Logger log = LoggerFactory.getLogger(SKUServiceImpl.class);

    private final SKURepository sKURepository;

    private final SKUMapper sKUMapper;

    public SKUServiceImpl(SKURepository sKURepository, SKUMapper sKUMapper) {
        this.sKURepository = sKURepository;
        this.sKUMapper = sKUMapper;
    }

    /**
     * Save a sKU.
     *
     * @param sKUDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SKUDTO save(SKUDTO sKUDTO) {
        log.debug("Request to save SKU : {}", sKUDTO);
        SKU sKU = sKUMapper.toEntity(sKUDTO);
        sKU = sKURepository.save(sKU);
        return sKUMapper.toDto(sKU);
    }

    /**
     * Get all the sKUS.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SKUDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SKUS");
        return sKURepository.findAll(pageable)
            .map(sKUMapper::toDto);
    }


    /**
     * Get one sKU by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SKUDTO> findOne(Long id) {
        log.debug("Request to get SKU : {}", id);
        return sKURepository.findById(id)
            .map(sKUMapper::toDto);
    }

    /**
     * Delete the sKU by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SKU : {}", id);
        sKURepository.deleteById(id);
    }
}
