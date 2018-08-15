package com.bcs.sip.application.service;

import com.bcs.sip.application.service.dto.PurchaseOrderLineDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing PurchaseOrderLine.
 */
public interface PurchaseOrderLineService {

    /**
     * Save a purchaseOrderLine.
     *
     * @param purchaseOrderLineDTO the entity to save
     * @return the persisted entity
     */
    PurchaseOrderLineDTO save(PurchaseOrderLineDTO purchaseOrderLineDTO);

    /**
     * Get all the purchaseOrderLines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PurchaseOrderLineDTO> findAll(Pageable pageable);


    /**
     * Get the "id" purchaseOrderLine.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PurchaseOrderLineDTO> findOne(Long id);

    /**
     * Delete the "id" purchaseOrderLine.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
