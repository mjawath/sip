package com.bcs.sip.application.service;

import com.bcs.sip.application.service.dto.SalesOrderLineDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SalesOrderLine.
 */
public interface SalesOrderLineService {

    /**
     * Save a salesOrderLine.
     *
     * @param salesOrderLineDTO the entity to save
     * @return the persisted entity
     */
    SalesOrderLineDTO save(SalesOrderLineDTO salesOrderLineDTO);

    /**
     * Get all the salesOrderLines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SalesOrderLineDTO> findAll(Pageable pageable);


    /**
     * Get the "id" salesOrderLine.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SalesOrderLineDTO> findOne(Long id);

    /**
     * Delete the "id" salesOrderLine.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
