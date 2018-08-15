package com.bcs.sip.application.service;

import com.bcs.sip.application.service.dto.SKUDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SKU.
 */
public interface SKUService {

    /**
     * Save a sKU.
     *
     * @param sKUDTO the entity to save
     * @return the persisted entity
     */
    SKUDTO save(SKUDTO sKUDTO);

    /**
     * Get all the sKUS.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SKUDTO> findAll(Pageable pageable);


    /**
     * Get the "id" sKU.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SKUDTO> findOne(Long id);

    /**
     * Delete the "id" sKU.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
