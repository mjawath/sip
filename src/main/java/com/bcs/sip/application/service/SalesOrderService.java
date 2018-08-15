package com.bcs.sip.application.service;

import com.bcs.sip.application.service.dto.SalesOrderDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SalesOrder.
 */
public interface SalesOrderService {

    /**
     * Save a salesOrder.
     *
     * @param salesOrderDTO the entity to save
     * @return the persisted entity
     */
    SalesOrderDTO save(SalesOrderDTO salesOrderDTO);

    /**
     * Get all the salesOrders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SalesOrderDTO> findAll(Pageable pageable);


    /**
     * Get the "id" salesOrder.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SalesOrderDTO> findOne(Long id);

    /**
     * Delete the "id" salesOrder.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
